import type { Server, Socket } from "socket.io"
import {
  answersSchema,
  C2S,
  joinSchema,
  resolveQuizQuestions,
  S2C,
  sanitizeLocale,
  type HostCreatePayload,
  type HostGenerateQuizPayload,
  type PlayerAnswerPayload,
  type PlayerJoinPayload,
} from "@codeclash/common"
import { generateQuiz } from "./ai/quizGenerator"
import type { Game } from "./game/Game"
import { GameManager } from "./game/GameManager"
import { RateLimiter } from "./rateLimiter"

const GRACE_MS = 45_000

export function registerHandlers(io: Server): void {
  const manager = new GameManager()
  // Anti-abuse: PIN brute-force, game-creation flood, answer spam.
  const joinLimiter = new RateLimiter(12, 1) // per IP: burst 12, ~1/s sustained
  const createLimiter = new RateLimiter(3, 0.2) // per socket: ~1 per 5s
  const answerLimiter = new RateLimiter(15, 5) // per socket
  const aiLimiter = new RateLimiter(2, 0.05) // per socket: burst 2, ~1 per 20s — AI calls cost real money
  const pendingRemoval = new Map<string, NodeJS.Timeout>()

  io.on("connection", (socket: Socket) => {
    const ip = socket.handshake.address || socket.id

    // Session recovered after a brief drop → cancel any scheduled removal so the
    // player keeps their score and the host keeps the game alive.
    if (socket.recovered) {
      const t = pendingRemoval.get(socket.id)
      if (t) {
        clearTimeout(t)
        pendingRemoval.delete(socket.id)
      }
      // A question already shown before the drop isn't "missed" by socket.io's own
      // event replay, so a reconnecting client's local timer can be stuck at the
      // pre-drop value. Resync it to the server's authoritative clock.
      const snapshot = manager.get(socket.data.pin)?.currentQuestionSnapshot()
      if (snapshot) {
        socket.emit(S2C.QUESTION, snapshot.question)
        if (snapshot.paused) socket.emit(S2C.PAUSED)
        else socket.emit(S2C.RESUMED, { remainingSec: snapshot.remainingSec })
      }
    }

    const hostGame = () =>
      socket.data.role === "host" ? manager.get(socket.data.pin) : undefined

    // "Play again" / re-host: drop the previous game this socket owned.
    const dropPreviousGame = () => {
      if (socket.data.role === "host" && socket.data.pin) {
        socket.leave(socket.data.pin)
        manager.remove(socket.data.pin)
      }
    }
    const joinAsHost = (game: Game) => {
      socket.join(game.pin)
      socket.data.role = "host"
      socket.data.pin = game.pin
      socket.emit(S2C.GAME_CREATED, { pin: game.pin })
      socket.emit(S2C.PLAYERS, game.playerList())
    }

    socket.on(C2S.HOST_CREATE, (payload: HostCreatePayload) => {
      if (!createLimiter.allow(socket.id)) {
        socket.emit(S2C.ERROR, "errors.rateLimited")
        return
      }
      dropPreviousGame()
      const questions = resolveQuizQuestions(payload?.quizId ?? "mixed", 10)
      if (!questions.length) {
        socket.emit(S2C.ERROR, "errors.noQuestions")
        return
      }
      const game = manager.create(
        io,
        socket.id,
        questions,
        sanitizeLocale(payload?.locale),
        payload?.scoringMode ?? "hybrid",
        Boolean(payload?.privateRank),
      )
      if (!game) {
        socket.emit(S2C.ERROR, "errors.serverBusy")
        return
      }
      joinAsHost(game)
    })

    socket.on(C2S.HOST_GENERATE_QUIZ, async (payload: HostGenerateQuizPayload) => {
      if (!aiLimiter.allow(socket.id)) {
        socket.emit(S2C.ERROR, "errors.rateLimited")
        return
      }
      const locale = sanitizeLocale(payload?.locale)
      let questions
      try {
        questions = await generateQuiz(payload?.topic, locale, 10)
      } catch (err) {
        socket.emit(S2C.ERROR, err instanceof Error ? err.message : "errors.aiFailed")
        return
      }
      // Only drop the host's previous game once generation actually succeeded.
      dropPreviousGame()
      const game = manager.create(
        io,
        socket.id,
        questions,
        locale,
        payload?.scoringMode ?? "hybrid",
        Boolean(payload?.privateRank),
      )
      if (!game) {
        socket.emit(S2C.ERROR, "errors.serverBusy")
        return
      }
      joinAsHost(game)
    })

    socket.on(C2S.PLAYER_JOIN, (payload: PlayerJoinPayload) => {
      if (!joinLimiter.allow(ip)) {
        socket.emit(S2C.ERROR, "errors.rateLimited")
        return
      }
      const parsed = joinSchema.safeParse(payload)
      if (!parsed.success) {
        socket.emit(S2C.ERROR, parsed.error.issues[0]?.message ?? "errors.invalidInput")
        return
      }
      const game = manager.get(parsed.data.pin)
      if (!game) {
        socket.emit(S2C.ERROR, "errors.gameNotFound")
        return
      }
      if (game.phase !== "lobby") {
        socket.emit(S2C.ERROR, "errors.gameStarted")
        return
      }
      const player = game.addPlayer(socket.id, parsed.data.username)
      if (!player) {
        socket.emit(S2C.ERROR, "errors.gameFull")
        return
      }
      socket.join(game.pin)
      socket.data.role = "player"
      socket.data.pin = game.pin
      socket.emit(S2C.JOINED, { pin: game.pin, you: player })
      io.to(game.pin).emit(S2C.PLAYERS, game.playerList())
      socket.to(game.pin).emit(S2C.PLAYER_JOINED, player)
    })

    socket.on(C2S.HOST_START, () => {
      const game = hostGame()
      if (!game) return
      io.to(game.pin).emit(S2C.STARTED)
      game.start()
    })

    socket.on(C2S.HOST_NEXT, () => hostGame()?.next())
    socket.on(C2S.HOST_SKIP, () => hostGame()?.closeQuestion())
    socket.on(C2S.HOST_PAUSE, () => hostGame()?.pause())
    socket.on(C2S.HOST_RESUME, () => hostGame()?.resume())

    socket.on(C2S.HOST_KICK, (payload: { playerId: string }) => {
      const game = hostGame()
      if (!game || !payload?.playerId || !game.players.has(payload.playerId)) return
      game.removePlayer(payload.playerId)
      io.in(payload.playerId).socketsLeave(game.pin) // actually eject from the room
      io.to(payload.playerId).emit(S2C.KICKED)
      io.to(game.pin).emit(S2C.PLAYERS, game.playerList())
      game.maybeAutoClose()
    })

    socket.on(C2S.PLAYER_ANSWER, (payload: PlayerAnswerPayload) => {
      if (!answerLimiter.allow(socket.id)) return
      const game = manager.get(socket.data.pin)
      if (!game) return
      const parsed = answersSchema.safeParse(payload?.answers)
      if (!parsed.success) return
      game.submitAnswer(socket.id, parsed.data)
    })

    socket.on("disconnect", () => {
      const pin: string | undefined = socket.data.pin
      const game = manager.get(pin)
      if (!game || !pin) return
      const role = socket.data.role
      const id = socket.id
      // Grace period: a brief drop shouldn't end the game or wipe a score.
      const timeout = setTimeout(() => {
        pendingRemoval.delete(id)
        const g = manager.get(pin)
        if (!g) return
        if (role === "host") {
          io.to(pin).emit(S2C.ERROR, "errors.hostLeft")
          manager.remove(pin)
        } else {
          g.removePlayer(id)
          io.to(pin).emit(S2C.PLAYERS, g.playerList())
          g.maybeAutoClose()
        }
      }, GRACE_MS)
      pendingRemoval.set(id, timeout)
    })
  })
}
