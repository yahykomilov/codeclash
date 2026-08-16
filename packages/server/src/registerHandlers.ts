import type { Server, Socket } from "socket.io"
import {
  C2S,
  S2C,
  joinSchema,
  resolveQuizQuestions,
  type HostCreatePayload,
  type PlayerAnswerPayload,
  type PlayerJoinPayload,
} from "@codeclash/common"
import { GameManager } from "./game/GameManager"

export function registerHandlers(io: Server): void {
  const manager = new GameManager()

  io.on("connection", (socket: Socket) => {
    const hostGame = () =>
      socket.data.role === "host" ? manager.get(socket.data.pin) : undefined

    socket.on(C2S.HOST_CREATE, (payload: HostCreatePayload) => {
      const questions = resolveQuizQuestions(payload?.quizId ?? "mixed", 10)
      if (!questions.length) {
        socket.emit(S2C.ERROR, "errors.noQuestions")
        return
      }
      const game = manager.create(io, socket.id, questions, payload?.locale ?? "ru")
      socket.join(game.pin)
      socket.data.role = "host"
      socket.data.pin = game.pin
      socket.emit(S2C.GAME_CREATED, { pin: game.pin })
      socket.emit(S2C.PLAYERS, game.playerList())
    })

    socket.on(C2S.PLAYER_JOIN, (payload: PlayerJoinPayload) => {
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

    socket.on(C2S.HOST_KICK, (payload: { playerId: string }) => {
      const game = hostGame()
      if (!game || !payload?.playerId) return
      game.removePlayer(payload.playerId)
      io.to(payload.playerId).emit(S2C.KICKED)
      io.to(game.pin).emit(S2C.PLAYERS, game.playerList())
    })

    socket.on(C2S.PLAYER_ANSWER, (payload: PlayerAnswerPayload) => {
      const game = manager.get(socket.data.pin)
      if (game && Array.isArray(payload?.answers)) {
        game.submitAnswer(socket.id, payload.answers)
      }
    })

    socket.on("disconnect", () => {
      const game = manager.get(socket.data.pin)
      if (!game) return
      if (socket.data.role === "host") {
        io.to(game.pin).emit(S2C.ERROR, "errors.hostLeft")
        manager.remove(game.pin)
      } else {
        game.removePlayer(socket.id)
        io.to(game.pin).emit(S2C.PLAYERS, game.playerList())
      }
    })
  })
}
