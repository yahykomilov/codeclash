import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  C2S,
  S2C,
  type LeaderboardEntry,
  type PlayerResult,
  type PublicQuestion,
  type RevealPayload,
} from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { speak, speechSupported } from "../lib/speech"
import { sound } from "../lib/sound"
import { Button } from "../components/ui"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]
const GLOW = [
  "shadow-[0_12px_44px_-8px_rgba(255,67,101,0.65)]",
  "shadow-[0_12px_44px_-8px_rgba(47,107,255,0.65)]",
  "shadow-[0_12px_44px_-8px_rgba(255,176,32,0.65)]",
  "shadow-[0_12px_44px_-8px_rgba(61,220,132,0.65)]",
]

type Phase = "waiting" | "question" | "result" | "finished" | "kicked" | "error"

export default function Play() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const nav = location.state as { pin?: string; username?: string } | null

  const [phase, setPhase] = useState<Phase>("waiting")
  const [question, setQuestion] = useState<PublicQuestion | null>(null)
  const [selected, setSelected] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const [result, setResult] = useState<PlayerResult | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [paused, setPaused] = useState(false)
  const [message, setMessage] = useState("")
  const [explanation, setExplanation] = useState<string | undefined>()
  const [board, setBoard] = useState<LeaderboardEntry[]>([])
  const lastRank = useRef(0)
  const lastPoints = useRef(0)

  useEffect(() => {
    if (!nav?.pin) {
      navigate("/join")
      return
    }
    const socket = getSocket()
    const onQuestion = (q: PublicQuestion) => {
      setQuestion(q)
      setSelected([])
      setLocked(false)
      setResult(null)
      setExplanation(undefined)
      setPaused(false)
      setSecondsLeft(q.time)
      setPhase("question")
    }
    const onReveal = (r: RevealPayload) => setExplanation(r.explanation)
    const onBoard = (b: LeaderboardEntry[]) => setBoard(b)
    const onPaused = () => setPaused(true)
    const onResumed = ({ remainingSec }: { remainingSec: number }) => {
      setSecondsLeft(remainingSec)
      setPaused(false)
    }
    const onResult = (r: PlayerResult) => {
      lastRank.current = r.rank
      lastPoints.current = r.points
      setResult(r)
      setPhase("result")
    }
    const onFinished = () => setPhase("finished")
    const onKicked = () => setPhase("kicked")
    const onError = (key: string) => {
      setMessage(t(key))
      setPhase("error")
    }
    socket.on(S2C.QUESTION, onQuestion)
    socket.on(S2C.REVEAL, onReveal)
    socket.on(S2C.LEADERBOARD, onBoard)
    socket.on(S2C.PLAYER_RESULT, onResult)
    socket.on(S2C.FINISHED, onFinished)
    socket.on(S2C.KICKED, onKicked)
    socket.on(S2C.ERROR, onError)
    socket.on(S2C.PAUSED, onPaused)
    socket.on(S2C.RESUMED, onResumed)
    return () => {
      socket.off(S2C.QUESTION, onQuestion)
      socket.off(S2C.REVEAL, onReveal)
      socket.off(S2C.LEADERBOARD, onBoard)
      socket.off(S2C.PLAYER_RESULT, onResult)
      socket.off(S2C.FINISHED, onFinished)
      socket.off(S2C.KICKED, onKicked)
      socket.off(S2C.ERROR, onError)
      socket.off(S2C.PAUSED, onPaused)
      socket.off(S2C.RESUMED, onResumed)
    }
  }, [nav, navigate, t])

  useEffect(() => {
    if (phase !== "question" || paused) return
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [phase, question, paused])

  useEffect(() => {
    if (phase === "result" && result) {
      if (result.correct) sound.correct()
      else sound.wrong()
    }
  }, [phase, result])

  function pick(i: number) {
    if (locked || paused || !question) return
    if (question.type === "multi") {
      setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
    } else {
      setSelected([i])
      setLocked(true)
      getSocket().emit(C2S.PLAYER_ANSWER, { answers: [i] })
    }
  }

  function submitMulti() {
    if (locked || selected.length === 0) return
    setLocked(true)
    getSocket().emit(C2S.PLAYER_ANSWER, { answers: selected })
  }

  if (phase === "waiting") {
    return (
      <Centered>
        <div className="text-center">
          <p className="text-lg opacity-70">{nav?.username}</p>
          <h2 className="mt-2 animate-pulse text-2xl font-bold">{t("join.waiting")}</h2>
        </div>
      </Centered>
    )
  }

  if (phase === "question" && question) {
    return (
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between text-sm font-bold opacity-80">
          <span>
            {t("game.question")} {question.index + 1}/{question.total}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">{secondsLeft}s</span>
        </div>
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-brand-light transition-all duration-1000 ease-linear"
            style={{ width: `${(secondsLeft / Math.max(1, question.time)) * 100}%` }}
          />
        </div>
        {paused ? (
          <Centered>
            <h2 className="text-center text-3xl font-black text-yellow-200">
              ⏸ {t("game.paused")}
            </h2>
          </Centered>
        ) : locked ? (
          <Centered>
            <h2 className="animate-pulse text-center text-2xl font-bold">
              {t("game.waitOthers")}
            </h2>
          </Centered>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-center gap-3">
              <p className="text-center text-sm opacity-70">
                {question.type === "multi" ? t("game.pickMultiple") : t("game.pickAnswer")}
              </p>
              {speechSupported && (
                <button
                  onClick={() =>
                    speak(`${question.question}. ${question.answers.join(", ")}`, i18n.language)
                  }
                  className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold hover:bg-white/20"
                >
                  🔊 {t("game.readAloud")}
                </button>
              )}
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              {question.answers.map((ans, i) => (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`flex min-h-[20vh] animate-pop-in flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center font-display text-xl font-bold text-white transition-all duration-150 active:scale-95 ${TILES[i % 4]} ${GLOW[i % 4]} ${
                    selected.includes(i)
                      ? "scale-[1.03] ring-4 ring-white"
                      : "opacity-95 hover:scale-[1.02]"
                  }`}
                >
                  <span className="text-4xl drop-shadow">{SHAPES[i % 4]}</span>
                  <span>{ans}</span>
                </button>
              ))}
            </div>
            {question.type === "multi" && (
              <Button onClick={submitMulti} disabled={selected.length === 0} className="mt-3">
                {t("game.submit")}
              </Button>
            )}
          </>
        )}
      </div>
    )
  }

  if (phase === "result" && result) {
    return (
      <Centered>
        <div className="animate-pop-in text-center">
          <h1
            className={`text-4xl font-black ${result.correct ? "text-answer-green" : "text-answer-red"}`}
          >
            {result.correct ? t("game.correct") : t("game.wrong")}
          </h1>
          {result.gained > 0 && (
            <p className="mt-2 text-2xl font-bold">+{result.gained}</p>
          )}
          {result.comeback && (
            <p className="mt-1 text-sm font-bold text-yellow-300">🚀 {t("game.comeback")}</p>
          )}
          <p className="mt-4 opacity-80">
            {t("game.rank")}: <b>#{result.rank}</b> · {result.points} {t("game.points")}
          </p>
          {result.streak > 1 && (
            <p className="mt-1 text-sm text-brand-light">🔥 {result.streak} {t("game.streak")}</p>
          )}
          {explanation && (
            <p className="mx-auto mt-4 max-w-xs rounded-xl bg-white/5 px-4 py-2 text-sm opacity-90">
              <b className="text-brand-light">{t("game.why")}:</b> {explanation}
            </p>
          )}
          {board.length > 0 && (
            <div className="mx-auto mt-4 max-w-xs space-y-1 text-left">
              {board.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 text-sm"
                >
                  <span className="font-bold">
                    {e.rank}. {e.username}
                  </span>
                  <span className="text-brand-light">{e.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Centered>
    )
  }

  if (phase === "finished") {
    return (
      <Centered>
        <div className="text-center">
          <h1 className="text-4xl font-black">{t("game.finished")}</h1>
          <p className="mt-3 text-xl">
            {t("game.rank")}: <b>#{lastRank.current}</b>
          </p>
          <p className="mt-1 opacity-80">
            {lastPoints.current} {t("game.points")}
          </p>
          <Link to="/" className="mt-6 inline-block font-bold text-brand-light">
            {t("common.home")}
          </Link>
        </div>
      </Centered>
    )
  }

  return (
    <Centered>
      <div className="text-center">
        <p className="text-xl font-bold text-answer-red">
          {message || (phase === "kicked" ? t("errors.hostLeft") : t("errors.invalidInput"))}
        </p>
        <Link to="/" className="mt-4 inline-block font-bold text-brand-light">
          {t("common.home")}
        </Link>
      </div>
    </Centered>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 items-center justify-center p-6">{children}</div>
}
