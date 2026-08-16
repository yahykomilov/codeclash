import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  C2S,
  QUIZZES,
  S2C,
  SCORING_MODES,
  type LeaderboardEntry,
  type Locale,
  type Player,
  type PublicQuestion,
  type RevealPayload,
  type ScoringMode,
} from "@codeclash/common"
import { QRCodeSVG } from "qrcode.react"
import confetti from "canvas-confetti"
import { getSocket } from "../lib/socket"
import { useAuth } from "../lib/auth"
import { Button, Card } from "../components/ui"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

type Phase = "pick" | "lobby" | "question" | "reveal" | "finished"

export default function Host() {
  const { t, i18n } = useTranslation()
  const { user, enabled } = useAuth()

  const [phase, setPhase] = useState<Phase>("pick")
  const [pin, setPin] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [question, setQuestion] = useState<PublicQuestion | null>(null)
  const [answered, setAnswered] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [reveal, setReveal] = useState<RevealPayload | null>(null)
  const [board, setBoard] = useState<LeaderboardEntry[]>([])
  const [podium, setPodium] = useState<LeaderboardEntry[]>([])
  const [scoringMode, setScoringMode] = useState<ScoringMode>("hybrid")

  useEffect(() => {
    const socket = getSocket()
    const onCreated = ({ pin }: { pin: string }) => {
      setPin(pin)
      setPhase("lobby")
    }
    const onPlayers = (p: Player[]) => setPlayers(p)
    const onQuestion = (q: PublicQuestion) => {
      setQuestion(q)
      setAnswered(0)
      setReveal(null)
      setSecondsLeft(q.time)
      setPhase("question")
    }
    const onCount = (n: number) => setAnswered(n)
    const onReveal = (r: RevealPayload) => {
      setReveal(r)
      setPhase("reveal")
    }
    const onBoard = (b: LeaderboardEntry[]) => setBoard(b)
    const onFinished = ({ podium }: { podium: LeaderboardEntry[] }) => {
      setPodium(podium)
      setPhase("finished")
    }
    socket.on(S2C.GAME_CREATED, onCreated)
    socket.on(S2C.PLAYERS, onPlayers)
    socket.on(S2C.QUESTION, onQuestion)
    socket.on(S2C.ANSWER_COUNT, onCount)
    socket.on(S2C.REVEAL, onReveal)
    socket.on(S2C.LEADERBOARD, onBoard)
    socket.on(S2C.FINISHED, onFinished)
    return () => {
      socket.off(S2C.GAME_CREATED, onCreated)
      socket.off(S2C.PLAYERS, onPlayers)
      socket.off(S2C.QUESTION, onQuestion)
      socket.off(S2C.ANSWER_COUNT, onCount)
      socket.off(S2C.REVEAL, onReveal)
      socket.off(S2C.LEADERBOARD, onBoard)
      socket.off(S2C.FINISHED, onFinished)
    }
  }, [])

  useEffect(() => {
    if (phase !== "question") return
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [phase, question])

  useEffect(() => {
    if (phase !== "finished") return
    const end = Date.now() + 1600
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#7c3aed", "#a78bfa", "#e21b3c", "#26890c"] })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#7c3aed", "#a78bfa", "#1368ce", "#d89e00"] })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [phase])

  const emit = (event: string, payload?: unknown) => getSocket().emit(event, payload)

  // ── Gate: real auth requires a signed-in user ─────────────
  if (enabled && !user) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <Card className="w-full max-w-sm text-center">
          <h1 className="mb-4 text-2xl font-black">{t("auth.signInToHost")}</h1>
          <Link to="/login">
            <Button className="w-full">{t("auth.login")}</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // ── Pick a quiz ───────────────────────────────────────────
  if (phase === "pick") {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-10">
        <h1 className="text-center text-3xl font-black">{t("host.pickQuiz")}</h1>
        {!enabled && (
          <p className="rounded-lg bg-yellow-500/15 px-3 py-2 text-center text-sm text-yellow-200">
            {t("auth.notConfigured")}
          </p>
        )}
        <div>
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-widest opacity-60">
            {t("host.scoring")}
          </p>
          <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-2">
            {SCORING_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setScoringMode(mode)}
                title={t(`host.scoring${cap(mode)}Hint`)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  scoringMode === mode ? "bg-brand text-white" : "bg-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                {t(`host.scoring${cap(mode)}`)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-xs opacity-60">{t(`host.scoring${cap(scoringMode)}Hint`)}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {QUIZZES.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() =>
                emit(C2S.HOST_CREATE, {
                  quizId: quiz.id,
                  locale: i18n.language as Locale,
                  scoringMode,
                })
              }
              className="rounded-2xl bg-white/5 p-6 text-left shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="text-xl font-extrabold">{t(`categories.${quiz.category}`)}</div>
              <div className="mt-1 text-sm opacity-70">{quiz.title}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Lobby ─────────────────────────────────────────────────
  if (phase === "lobby") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest opacity-60">{t("host.showScreen")}</p>
          <p className="text-sm opacity-70">{t("host.pinLabel")}</p>
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-white/10 px-10 py-4 text-6xl font-black tracking-[0.3em]">
              {pin}
            </div>
            <div className="rounded-xl bg-white p-2 shadow-lg">
              <QRCodeSVG value={`${window.location.origin}/join?pin=${pin}`} size={128} />
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <p className="mb-3 text-center font-bold opacity-80">
            {t("host.players")}: {players.length}
          </p>
          {players.length === 0 ? (
            <p className="text-center opacity-60">{t("host.noPlayers")}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {players.map((p) => (
                <span
                  key={p.id}
                  className="animate-pop-in rounded-full bg-brand/30 px-4 py-2 font-bold ring-1 ring-brand-light/30"
                >
                  {p.username}
                </span>
              ))}
            </div>
          )}
        </div>

        <Button onClick={() => emit(C2S.HOST_START)} disabled={players.length === 0} className="px-10 text-lg">
          {t("host.start")}
        </Button>
      </div>
    )
  }

  // ── Live question (big screen) ────────────────────────────
  if (phase === "question" && question) {
    return (
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-bold opacity-80">
            {t("host.players")}: {players.length} · {answered} {t("game.answered")}
          </span>
          <span className="rounded-full bg-white/10 px-5 py-2 text-2xl font-black">{secondsLeft}</span>
        </div>
        {question && (
          <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand-light transition-all duration-1000 ease-linear"
              style={{ width: `${(secondsLeft / Math.max(1, question.time)) * 100}%` }}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <h1 className="max-w-3xl text-center text-3xl font-black sm:text-4xl">{question.question}</h1>
          <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
            {question.answers.map((ans, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-2xl p-5 text-xl font-bold text-white shadow-lg ${TILES[i % 4]}`}
              >
                <span className="text-3xl">{SHAPES[i % 4]}</span>
                <span>{ans}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => emit(C2S.HOST_SKIP)} className="bg-white/10 hover:bg-white/20">
            {t("host.skip")}
          </Button>
        </div>
      </div>
    )
  }

  // ── Reveal answers + votes ────────────────────────────────
  if (phase === "reveal" && question && reveal) {
    const maxVotes = Math.max(1, ...reveal.votes)
    return (
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <h1 className="max-w-3xl text-center text-2xl font-black sm:text-3xl">{question.question}</h1>
          <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
            {question.answers.map((ans, i) => {
              const isCorrect = reveal.correct.includes(i)
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-5 text-white shadow-lg transition ${TILES[i % 4]} ${
                    isCorrect ? "ring-4 ring-white" : "opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{SHAPES[i % 4]}</span>
                      {ans}
                    </span>
                    <span>{isCorrect ? "✓" : ""}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-black/30">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{ width: `${(reveal.votes[i] / maxVotes) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {reveal.explanation && (
            <div className="max-w-2xl rounded-2xl bg-brand/15 px-5 py-3 text-center ring-1 ring-brand-light/30">
              <span className="font-bold text-brand-light">{t("game.why")}: </span>
              {reveal.explanation}
            </div>
          )}

          {board.length > 0 && (
            <div className="w-full max-w-md">
              <p className="mb-2 text-center font-bold opacity-80">{t("game.leaderboard")}</p>
              <div className="space-y-1">
                {board.slice(0, 5).map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2"
                  >
                    <span className="font-bold">
                      {e.rank}. {e.username}
                    </span>
                    <span className="text-brand-light">{e.points}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => emit(C2S.HOST_NEXT)} className="px-10 text-lg">
            {t("host.next")}
          </Button>
        </div>
      </div>
    )
  }

  // ── Finished — podium ─────────────────────────────────────
  if (phase === "finished") {
    const order = [1, 0, 2] // silver, gold, bronze layout
    const heights = ["h-32", "h-44", "h-24"]
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-10">
        <h1 className="text-4xl font-black">🏆 {t("game.podium")}</h1>
        <div className="flex items-end gap-4">
          {order.map((idx, i) => {
            const e = podium[idx]
            if (!e) return <div key={i} className="w-24" />
            return (
              <div key={e.id} className="flex flex-col items-center gap-2">
                <span className="font-black">{e.username}</span>
                <div
                  className={`flex w-24 items-start justify-center rounded-t-xl bg-brand/40 pt-2 font-black ${heights[i]}`}
                >
                  #{e.rank}
                </div>
                <span className="text-brand-light">{e.points}</span>
              </div>
            )
          })}
        </div>
        <Button onClick={() => setPhase("pick")} className="px-8">
          {t("game.playAgain")}
        </Button>
      </div>
    )
  }

  return null
}
