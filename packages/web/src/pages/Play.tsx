import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  C2S,
  S2C,
  type PlayerResult,
  type PublicQuestion,
  type RevealPayload,
} from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { speak, speechSupported } from "../lib/speech"
import { Button } from "../components/ui"

const TILES = ["bg-answer-red", "bg-answer-blue", "bg-answer-yellow", "bg-answer-green"]
const SHAPES = ["▲", "◆", "●", "■"]

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
  const [message, setMessage] = useState("")
  const [explanation, setExplanation] = useState<string | undefined>()
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
      setSecondsLeft(q.time)
      setPhase("question")
    }
    const onReveal = (r: RevealPayload) => setExplanation(r.explanation)
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
    socket.on(S2C.PLAYER_RESULT, onResult)
    socket.on(S2C.FINISHED, onFinished)
    socket.on(S2C.KICKED, onKicked)
    socket.on(S2C.ERROR, onError)
    return () => {
      socket.off(S2C.QUESTION, onQuestion)
      socket.off(S2C.REVEAL, onReveal)
      socket.off(S2C.PLAYER_RESULT, onResult)
      socket.off(S2C.FINISHED, onFinished)
      socket.off(S2C.KICKED, onKicked)
      socket.off(S2C.ERROR, onError)
    }
  }, [nav, navigate, t])

  useEffect(() => {
    if (phase !== "question") return
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [phase, question])

  function pick(i: number) {
    if (locked || !question) return
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
        {locked ? (
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
                  className={`flex items-center justify-center gap-2 rounded-2xl p-4 text-lg font-bold text-white shadow-lg transition active:scale-95 ${TILES[i % 4]} ${
                    selected.includes(i) ? "ring-4 ring-white" : "opacity-95"
                  }`}
                >
                  <span className="text-2xl">{SHAPES[i % 4]}</span>
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
