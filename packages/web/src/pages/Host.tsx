import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  C2S,
  QUIZZES,
  S2C,
  type LeaderboardEntry,
  type Locale,
  type Player,
  type PublicQuestion,
  type RevealPayload,
} from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { useAuth } from "../lib/auth"
import { Button, Card, NeonCard } from "../components/ui"
import { QRCode } from "../components/QRCode"
import { TimerBar } from "../components/TimerBar"
import { Confetti } from "../components/Confetti"
import { useSound } from "../lib/sound"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]

type Phase = "pick" | "lobby" | "question" | "reveal" | "finished"

export default function Host() {
  const { t, i18n } = useTranslation()
  const { user, enabled } = useAuth()
  const playSound = useSound()

  const [phase, setPhase] = useState<Phase>("pick")
  const [pin, setPin] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [question, setQuestion] = useState<PublicQuestion | null>(null)
  const [answered, setAnswered] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [reveal, setReveal] = useState<RevealPayload | null>(null)
  const [board, setBoard] = useState<LeaderboardEntry[]>([])
  const [podium, setPodium] = useState<LeaderboardEntry[]>([])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const socket = getSocket()
    const onCreated = ({ pin }: { pin: string }) => {
      setPin(pin)
      setPhase("lobby")
      playSound("join")
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
      playSound("correct")
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
  }, [playSound])

  useEffect(() => {
    if (phase !== "question" || paused) return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id)
          playSound("timeup")
          return 0
        }
        if (s <= 5) playSound("tick")
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase, paused, playSound])

  const emit = (event: string, payload?: unknown) => getSocket().emit(event, payload)

  // ── Gate: real auth requires a signed-in user ─────────────
  if (enabled && !user) {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
          <Card className="w-full max-w-sm text-center">
            <h1 className="mb-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
              {t("auth.signInToHost")}
            </h1>
            <Link to="/login">
              <Button className="w-full">{t("auth.login")}</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  // ── Pick a quiz ───────────────────────────────────────────
  if (phase === "pick") {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-10">
          <h1 className="text-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
            {t("host.pickQuiz")}
          </h1>
          {!enabled && (
            <p className="rounded-lg bg-yellow-500/15 px-3 py-2 text-center text-sm text-yellow-200">
              {t("auth.notConfigured")}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {QUIZZES.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => emit(C2S.HOST_CREATE, { quizId: quiz.id, locale: i18n.language as Locale })}
                className="group relative rounded-2xl bg-white/5 p-6 text-left shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-brand/10 via-transparent to-cyan/10 opacity-0 group-hover:opacity-100" />
                <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">
                  {t(`categories.${quiz.category}`)}
                </div>
                <div className="mt-1 text-sm text-white/60">{quiz.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Lobby ─────────────────────────────────────────────────
  if (phase === "lobby") {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-white/40">
              {t("host.showScreen")}
            </p>
            <p className="mt-1 text-sm text-white/60">{t("host.pinLabel")}</p>
            <div className="relative mt-4 rounded-2xl bg-white/5 px-10 py-6 text-6xl font-black tracking-[0.3em] ring-1 ring-brand-light/30">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-cyan to-pink">
                {pin}
              </span>
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-brand/20 via-transparent to-cyan/20 opacity-50 blur" />
            </div>
          </div>

          {/* QR-код для игроков */}
          <div className="flex items-center gap-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <QRCode pin={pin} size={140} />
            <div className="text-left">
              <p className="font-bold text-brand-light">{t("home.scanToJoin")}</p>
              <p className="text-sm text-white/60">{t("join.title")}: {pin}</p>
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <p className="mb-3 text-center font-bold text-white/70">
              {t("host.players")}: {players.length}
            </p>
            {players.length === 0 ? (
              <p className="text-center text-white/40">{t("host.noPlayers")}</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {players.map((p, i) => (
                  <span
                    key={p.id}
                    className="animate-pop-in rounded-full bg-gradient-to-r from-brand/30 to-cyan/30 px-4 py-2 font-bold ring-1 ring-brand-light/30"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {p.username}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                setPaused(!paused)
                emit(paused ? C2S.HOST_START : C2S.HOST_START)
              }}
              className="px-6"
            >
              {paused ? "▶ " + t("host.resume") : "⏸ " + t("host.pause")}
            </Button>
            <Button
              onClick={() => emit(C2S.HOST_START)}
              disabled={players.length === 0}
              className="px-10 text-lg"
            >
              {t("host.start")}
            </Button>
          </div>

          {/* Позиционирование против Kahoot */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs">
            <span className="rounded-full bg-gradient-to-r from-green/20 to-transparent px-3 py-1 font-bold text-green ring-1 ring-green/30">
              ✅ {t("features.honestScoring")}
            </span>
            <span className="rounded-full bg-gradient-to-r from-cyan/20 to-transparent px-3 py-1 font-bold text-cyan ring-1 ring-cyan/30">
              📖 {t("features.explanations")}
            </span>
            <span className="rounded-full bg-gradient-to-r from-pink/20 to-transparent px-3 py-1 font-bold text-pink ring-1 ring-pink/30">
              ∞ {t("features.unlimitedPlayers")}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // ── Live question (big screen) ────────────────────────────
  if (phase === "question" && question) {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold text-white/70">
              {t("host.players")}: {players.length} · {answered} {t("game.answered")}
            </span>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-5 py-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
                {secondsLeft}
              </span>
              <TimerBar seconds={secondsLeft} total={question.time} className="w-32" />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <h1 className="max-w-3xl text-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-light to-cyan sm:text-4xl">
              {question.question}
            </h1>

            <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
              {question.answers.map((ans, i) => (
                <div
                  key={i}
                  className={`
                    relative flex items-center gap-3 rounded-2xl p-5 text-xl font-bold text-white shadow-lg
                    ${TILES[i % 4]}
                    transition-all duration-300
                  `}
                >
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100" />
                  <span className="text-3xl">{SHAPES[i % 4]}</span>
                  <span>{ans}</span>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand/10 via-transparent to-cyan/10 opacity-0 blur" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <Button
              onClick={() => {
                setPaused(true)
                emit(C2S.HOST_SKIP)
              }}
              className="bg-white/10 hover:bg-white/20"
            >
              {t("host.skip")}
            </Button>
            <Button onClick={() => emit(C2S.HOST_NEXT)} className="px-10 text-lg">
              {t("host.next")}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Reveal answers + votes ────────────────────────────────
  if (phase === "reveal" && question && reveal) {
    const maxVotes = Math.max(1, ...reveal.votes)
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <h1 className="max-w-3xl text-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-light to-cyan sm:text-3xl">
              {question.question}
            </h1>

            <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
              {question.answers.map((ans, i) => {
                const isCorrect = reveal.correct.includes(i)
                return (
                  <div
                    key={i}
                    className={`
                      relative rounded-2xl p-5 text-white shadow-lg transition-all
                      ${TILES[i % 4]}
                      ${isCorrect ? "ring-4 ring-brand-light" : "opacity-40"}
                    `}
                  >
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-white/5 to-transparent" />
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">{SHAPES[i % 4]}</span>
                        {ans}
                      </span>
                      <span className="text-3xl">{isCorrect ? "✓" : ""}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-black/30">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-brand-light to-cyan transition-all duration-500"
                        style={{ width: `${(reveal.votes[i] / maxVotes) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {board.length > 0 && (
              <div className="w-full max-w-md">
                <p className="mb-2 text-center font-bold text-white/70">
                  {t("game.leaderboard")}
                </p>
                <div className="space-y-1">
                  {board.slice(0, 5).map((e, i) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2 transition hover:bg-white/10"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <span className="flex items-center gap-2 font-bold">
                        <span className="text-brand-light">#{e.rank}</span>
                        {e.username}
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
      </div>
    )
  }

  // ── Finished — podium ─────────────────────────────────────
  if (phase === "finished") {
    const order = [1, 0, 2] // silver, gold, bronze layout
    const heights = ["h-32", "h-44", "h-24"]
    const medals = ["🥈", "🥇", "🥉"]

    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <Confetti active={true} count={150} />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6 py-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-light to-cyan">
            🏆 {t("game.podium")}
          </h1>

          <div className="flex items-end gap-6">
            {order.map((idx, i) => {
              const e = podium[idx]
              if (!e) return <div key={i} className="w-24" />
              return (
                <div
                  key={e.id}
                  className="flex flex-col items-center gap-3"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="text-4xl">{medals[i]}</div>
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
                    {e.username}
                  </span>
                  <div
                    className={`
                      relative flex w-24 items-start justify-center rounded-t-xl
                      bg-gradient-to-b from-brand/40 to-brand-dark/40 pt-2 font-black
                      ring-1 ring-brand-light/30
                      ${heights[i]}
                    `}
                  >
                    <span className="text-3xl">#{e.rank}</span>
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-brand/20 via-transparent to-cyan/20 opacity-50 blur" />
                  </div>
                  <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-brand-light">
                    {e.points}
                  </span>
                </div>
              )
            })}
          </div>

          <Button onClick={() => setPhase("pick")} className="px-8">
            {t("game.playAgain")}
          </Button>
        </div>
      </div>
    )
  }

  return null
}
