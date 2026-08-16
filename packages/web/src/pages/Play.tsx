import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { C2S, S2C, type PlayerResult, type PublicQuestion } from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { Button } from "../components/ui"
import { TimerBar } from "../components/TimerBar"
import { Confetti } from "../components/Confetti"
import { useSound } from "../lib/sound"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]

type Phase = "waiting" | "question" | "result" | "finished" | "kicked" | "error"

export default function Play() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const nav = location.state as { pin?: string; username?: string } | null
  const playSound = useSound()

  const [phase, setPhase] = useState<Phase>("waiting")
  const [question, setQuestion] = useState<PublicQuestion | null>(null)
  const [selected, setSelected] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const [result, setResult] = useState<PlayerResult | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [message, setMessage] = useState("")
  const [miniBoard, setMiniBoard] = useState<Array<{ username: string; points: number; rank: number }>>([])
  const lastRank = useRef(0)

  useEffect(() => {
    if (!nav?.pin) {
      navigate("/join")
      return
    }

    // Автозаполнение PIN из URL
    const urlParams = new URLSearchParams(location.search)
    const urlPin = urlParams.get("pin")
    if (urlPin && urlPin.length === 6) {
      // PIN уже в nav.state, но можно использовать из URL
    }

    const socket = getSocket()
    const onQuestion = (q: PublicQuestion) => {
      setQuestion(q)
      setSelected([])
      setLocked(false)
      setResult(null)
      setSecondsLeft(q.time)
      setPhase("question")
    }
    const onResult = (r: PlayerResult) => {
      lastRank.current = r.rank
      setResult(r)
      setPhase("result")
      if (r.correct) playSound("correct")
      else playSound("wrong")
    }
    const onFinished = () => setPhase("finished")
    const onKicked = () => setPhase("kicked")
    const onError = (key: string) => {
      setMessage(t(key))
      setPhase("error")
    }

    socket.on(S2C.QUESTION, onQuestion)
    socket.on(S2C.PLAYER_RESULT, onResult)
    socket.on(S2C.FINISHED, onFinished)
    socket.on(S2C.KICKED, onKicked)
    socket.on(S2C.ERROR, onError)

    return () => {
      socket.off(S2C.QUESTION, onQuestion)
      socket.off(S2C.PLAYER_RESULT, onResult)
      socket.off(S2C.FINISHED, onFinished)
      socket.off(S2C.KICKED, onKicked)
      socket.off(S2C.ERROR, onError)
    }
  }, [nav, navigate, t, location.search, playSound])

  useEffect(() => {
    if (phase !== "question") return
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
  }, [phase, playSound])

  function pick(i: number) {
    if (locked || !question) return
    playSound("click")
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
    playSound("click")
    setLocked(true)
    getSocket().emit(C2S.PLAYER_ANSWER, { answers: selected })
  }

  if (phase === "waiting") {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 items-center justify-center p-6">
          <div className="text-center">
            <p className="text-lg text-white/70">{nav?.username}</p>
            <h2 className="mt-2 animate-pulse text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
              {t("join.waiting")}
            </h2>
            <div className="mt-6 flex justify-center gap-2">
              <span className="text-xs text-white/40">PIN: {nav?.pin}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "question" && question) {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <div className="relative z-10 flex flex-1 flex-col p-4">
          <div className="mb-3 flex items-center justify-between text-sm font-bold text-white/70">
            <span>
              {t("game.question")} {question.index + 1}/{question.total}
            </span>
            <div className="flex items-center gap-2">
              <TimerBar seconds={secondsLeft} total={question.time} className="w-24" />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
                {secondsLeft}s
              </span>
            </div>
          </div>

          {locked ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <h2 className="animate-pulse text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
                {t("game.waitOthers")}
              </h2>
            </div>
          ) : (
            <>
              <p className="mb-4 text-center text-sm text-white/60">
                {t("game.pickAnswer")}
              </p>
              <div className="grid flex-1 grid-cols-2 gap-3">
                {question.answers.map((ans, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`
                      relative flex items-center justify-center gap-2 rounded-2xl p-4 text-lg font-bold text-white shadow-lg
                      transition-all duration-200
                      ${TILES[i % 4]}
                      ${selected.includes(i) ? "ring-4 ring-white scale-105" : "opacity-95 hover:scale-102"}
                      active:scale-95
                    `}
                  >
                    <span className="text-2xl">{SHAPES[i % 4]}</span>
                    <span>{ans}</span>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              {question.type === "multi" && (
                <Button
                  onClick={submitMulti}
                  disabled={selected.length === 0}
                  className="mt-3"
                >
                  {t("join.enter")}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  if (phase === "result" && result) {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <Confetti active={result.correct} count={result.correct ? 80 : 0} />

        <div className="relative z-10 flex flex-1 items-center justify-center p-6">
          <div className="animate-pop-in text-center">
            <h1
              className={`text-4xl font-black ${
                result.correct
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              }`}
            >
              {result.correct ? t("game.correct") : t("game.wrong")}
            </h1>

            {result.gained > 0 && (
              <p className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
                +{result.gained}
              </p>
            )}

            <p className="mt-4 text-white/70">
              {t("game.rank")}: <b className="text-brand-light">#{result.rank}</b> · {result.points} {t("game.points")}
            </p>

            {result.streak > 1 && (
              <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-brand-light">
                🔥 {result.streak} {t("game.streak")}
              </p>
            )}

            {/* Мини-лидерборд */}
            {miniBoard.length > 0 && (
              <div className="mt-6 w-full max-w-sm">
                <p className="mb-2 text-center text-xs font-bold text-white/60">
                  {t("game.leaderboard")}
                </p>
                <div className="space-y-1">
                  {miniBoard.slice(0, 3).map((e) => (
                    <div
                      key={e.rank}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 text-sm"
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
        </div>
      </div>
    )
  }

  if (phase === "finished") {
    return (
      <div className="relative min-h-screen">
        <div className="aurora-bg" />
        <div className="terminal-grid" />
        <Confetti active={true} count={100} />

        <div className="relative z-10 flex flex-1 items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-light to-cyan">
              {t("game.finished")}
            </h1>
            <p className="mt-3 text-xl text-white/70">
              {t("game.rank")}: <b className="text-brand-light">#{lastRank.current}</b>
            </p>
            <Link to="/" className="mt-6 inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
              {t("common.home")}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora-bg" />
      <div className="terminal-grid" />
      <div className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="text-center">
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            {message || (phase === "kicked" ? t("errors.hostLeft") : t("errors.invalidInput"))}
          </p>
          <Link to="/" className="mt-4 inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
            {t("common.home")}
          </Link>
        </div>
      </div>
    </div>
  )
}
