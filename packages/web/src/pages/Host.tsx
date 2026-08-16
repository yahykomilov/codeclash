import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  C2S,
  QUESTIONS,
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
import { Button, Card, Input } from "../components/ui"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]
const GLOW = [
  "shadow-[0_14px_50px_-10px_rgba(255,67,101,0.6)]",
  "shadow-[0_14px_50px_-10px_rgba(47,107,255,0.6)]",
  "shadow-[0_14px_50px_-10px_rgba(255,176,32,0.6)]",
  "shadow-[0_14px_50px_-10px_rgba(61,220,132,0.6)]",
]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Per-subject visual identity for the quiz-pick cards — reuses the existing palette only. */
const QUIZ_META: Record<
  string,
  { icon: string; badge: string; glow: string; ring: string; accent: string; span?: string }
> = {
  mixed: {
    icon: "🧩",
    badge: "bg-brand/25 text-brand-light",
    glow: "bg-brand",
    ring: "hover:ring-brand/40",
    accent: "from-brand/20 via-neon-magenta/10 to-neon-cyan/10",
    span: "sm:col-span-2",
  },
  html: {
    icon: "🌐",
    badge: "bg-answer-red/20 text-answer-red",
    glow: "bg-answer-red",
    ring: "hover:ring-answer-red/40",
    accent: "from-answer-red/15 to-transparent",
  },
  css: {
    icon: "🎨",
    badge: "bg-neon-cyan/20 text-neon-cyan",
    glow: "bg-neon-cyan",
    ring: "hover:ring-neon-cyan/40",
    accent: "from-neon-cyan/15 to-transparent",
  },
  js: {
    icon: "⚡",
    badge: "bg-answer-yellow/20 text-answer-yellow",
    glow: "bg-answer-yellow",
    ring: "hover:ring-answer-yellow/40",
    accent: "from-answer-yellow/15 to-transparent",
  },
  react: {
    icon: "⚛️",
    badge: "bg-neon-magenta/20 text-neon-magenta",
    glow: "bg-neon-magenta",
    ring: "hover:ring-neon-magenta/40",
    accent: "from-neon-magenta/15 to-transparent",
  },
}

const quizQuestionCount = (category: string) =>
  category === "mixed" ? QUESTIONS.length : QUESTIONS.filter((q) => q.category === category).length

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
  const [privateRank, setPrivateRank] = useState(false)
  const [paused, setPaused] = useState(false)
  const [topic, setTopic] = useState("")
  const [generating, setGenerating] = useState(false)
  const [aiError, setAiError] = useState("")

  useEffect(() => {
    const socket = getSocket()
    const onCreated = ({ pin }: { pin: string }) => {
      setPin(pin)
      setGenerating(false)
      setPhase("lobby")
    }
    const onPlayers = (p: Player[]) => setPlayers(p)
    const onQuestion = (q: PublicQuestion) => {
      setQuestion(q)
      setAnswered(0)
      setReveal(null)
      setPaused(false)
      setSecondsLeft(q.time)
      setPhase("question")
    }
    const onCount = (n: number) => setAnswered(n)
    const onPaused = () => setPaused(true)
    const onResumed = ({ remainingSec }: { remainingSec: number }) => {
      setSecondsLeft(remainingSec)
      setPaused(false)
    }
    const onReveal = (r: RevealPayload) => {
      setReveal(r)
      setPhase("reveal")
    }
    const onBoard = (b: LeaderboardEntry[]) => setBoard(b)
    const onFinished = ({ podium }: { podium: LeaderboardEntry[] }) => {
      setPodium(podium)
      setPhase("finished")
    }
    const onError = (key: string) => {
      setGenerating(false)
      setAiError(t(key))
    }
    socket.on(S2C.GAME_CREATED, onCreated)
    socket.on(S2C.PLAYERS, onPlayers)
    socket.on(S2C.QUESTION, onQuestion)
    socket.on(S2C.ANSWER_COUNT, onCount)
    socket.on(S2C.REVEAL, onReveal)
    socket.on(S2C.LEADERBOARD, onBoard)
    socket.on(S2C.FINISHED, onFinished)
    socket.on(S2C.PAUSED, onPaused)
    socket.on(S2C.RESUMED, onResumed)
    socket.on(S2C.ERROR, onError)
    return () => {
      socket.off(S2C.GAME_CREATED, onCreated)
      socket.off(S2C.PLAYERS, onPlayers)
      socket.off(S2C.QUESTION, onQuestion)
      socket.off(S2C.ANSWER_COUNT, onCount)
      socket.off(S2C.REVEAL, onReveal)
      socket.off(S2C.LEADERBOARD, onBoard)
      socket.off(S2C.FINISHED, onFinished)
      socket.off(S2C.PAUSED, onPaused)
      socket.off(S2C.RESUMED, onResumed)
      socket.off(S2C.ERROR, onError)
    }
  }, [t])

  useEffect(() => {
    if (phase !== "question" || paused) return
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [phase, question, paused])

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

  function generateAiQuiz(e: FormEvent) {
    e.preventDefault()
    if (generating || topic.trim().length < 2) return
    setAiError("")
    setGenerating(true)
    emit(C2S.HOST_GENERATE_QUIZ, {
      topic: topic.trim(),
      locale: i18n.language as Locale,
      scoringMode,
      privateRank,
    })
  }

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

        <button
          onClick={() => setPrivateRank((v) => !v)}
          className="mx-auto flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          <span
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${privateRank ? "bg-brand" : "bg-white/20"}`}
          >
            <span className={`h-4 w-4 rounded-full bg-white transition ${privateRank ? "translate-x-4" : ""}`} />
          </span>
          <span className="font-bold">{t("host.privateRank")}</span>
          <span className="opacity-60">— {t("host.privateRankHint")}</span>
        </button>

        <div className="grid gap-4 sm:grid-cols-2">
          {QUIZZES.map((quiz, i) => {
            const meta = QUIZ_META[quiz.category] ?? QUIZ_META.mixed
            const count = quizQuestionCount(quiz.category)
            return (
              <button
                key={quiz.id}
                disabled={generating}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() =>
                  emit(C2S.HOST_CREATE, {
                    quizId: quiz.id,
                    locale: i18n.language as Locale,
                    scoringMode,
                    privateRank,
                  })
                }
                className={`group relative animate-rise overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-left shadow-lg ring-1 ring-white/10 transition duration-200 hover:-translate-y-1 disabled:pointer-events-none disabled:opacity-40 ${meta.accent} ${meta.ring} ${meta.span ?? ""}`}
              >
                <span
                  className={`pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35 ${meta.glow}`}
                />
                <div className="relative flex items-center gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${meta.badge}`}>
                    {meta.icon}
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold">{t(`categories.${quiz.category}`)}</div>
                    <div className="mt-0.5 text-sm opacity-70">{quiz.title}</div>
                  </div>
                </div>
                <div className="relative mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-50">
                  <span>{count}</span>
                  <span>{t("host.questions")}</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mx-auto w-full max-w-xl">
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-widest opacity-60">
            {t("host.aiDivider")}
          </p>
          <form onSubmit={generateAiQuiz} className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("host.aiTopicPlaceholder")}
              maxLength={80}
              disabled={generating}
            />
            <Button
              type="submit"
              disabled={generating || topic.trim().length < 2}
              className="whitespace-nowrap"
            >
              {generating ? t("host.aiGenerating") : t("host.aiGenerate")}
            </Button>
          </form>
          <p className="mt-2 text-center text-xs opacity-50">{t("host.aiHint")}</p>
          {aiError && <p className="mt-2 text-center text-sm text-answer-red">{aiError}</p>}
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
            <div className="rounded-2xl border border-neon-cyan/30 bg-white/5 px-10 py-4 font-code text-6xl font-extrabold tracking-[0.2em] text-neon-cyan shadow-[0_0_50px_-10px_rgba(34,211,238,0.6)]">
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
        <p className="text-xs opacity-50">{t("host.freePerks")}</p>
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
        {paused && (
          <div className="mb-4 rounded-xl bg-yellow-500/20 py-2 text-center text-xl font-black text-yellow-200">
            ⏸ {t("game.paused")}
          </div>
        )}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <h1 className="max-w-3xl text-center font-display text-3xl font-bold leading-tight sm:text-5xl">
            {question.question}
          </h1>
          <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
            {question.answers.map((ans, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 70}ms` }}
                className={`flex animate-pop-in items-center gap-3 rounded-2xl p-5 font-display text-xl font-bold text-white ${TILES[i % 4]} ${GLOW[i % 4]}`}
              >
                <span className="text-3xl">{SHAPES[i % 4]}</span>
                <span>{ans}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-3">
          <Button
            onClick={() => emit(paused ? C2S.HOST_RESUME : C2S.HOST_PAUSE)}
            className="bg-white/10 hover:bg-white/20"
          >
            {paused ? t("host.resume") : t("host.pause")}
          </Button>
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
      <div className="flex flex-1 flex-col items-center gap-6 p-6">
        {board.length > 0 && (
          <div className="w-full max-w-md">
            <p className="mb-2 text-center font-bold uppercase tracking-widest opacity-60">
              {t("game.leaderboard")}
            </p>
            <div className="space-y-1.5">
              {board.slice(0, 5).map((e) => (
                <div
                  key={e.id}
                  className="flex animate-pop-in items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10"
                >
                  <span className="font-display font-bold">
                    {e.rank}. {e.username}
                  </span>
                  <span className="font-display font-bold text-brand-light">{e.points}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4">
          <h2 className="text-center font-display text-lg font-bold opacity-80 sm:text-xl">
            {question.question}
          </h2>
          <div className="grid w-full grid-cols-2 gap-2.5">
            {question.answers.map((ans, i) => {
              const isCorrect = reveal.correct.includes(i)
              return (
                <div
                  key={i}
                  className={`rounded-xl p-3 text-sm text-white shadow-md transition ${TILES[i % 4]} ${
                    isCorrect ? "ring-2 ring-white" : "opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{SHAPES[i % 4]}</span>
                      {ans}
                    </span>
                    <span>{isCorrect ? "✓" : ""}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-black/30">
                    <div
                      className="h-1.5 rounded-full bg-white"
                      style={{ width: `${(reveal.votes[i] / maxVotes) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {reveal.explanation && (
            <div className="max-w-2xl rounded-xl bg-brand/15 px-4 py-2 text-center text-sm ring-1 ring-brand-light/30">
              <span className="font-bold text-brand-light">{t("game.why")}: </span>
              {reveal.explanation}
            </div>
          )}
        </div>

        <Button onClick={() => emit(C2S.HOST_NEXT)} className="px-10 text-lg">
          {t("host.next")}
        </Button>
      </div>
    )
  }

  // ── Finished — podium ─────────────────────────────────────
  if (phase === "finished") {
    const order = [1, 0, 2] // silver, gold, bronze layout
    const heights = ["h-32", "h-44", "h-24"]
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-10">
        <h1 className="font-display text-5xl font-bold">
          🏆 <span className="text-gradient">{t("game.podium")}</span>
        </h1>
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
