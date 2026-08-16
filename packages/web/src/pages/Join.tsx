import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { C2S, S2C } from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { Button, Card, Input } from "../components/ui"
import { useSound } from "../lib/sound"

export default function Join() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const playSound = useSound()

  const [pin, setPin] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const nameRef = useRef("")
  nameRef.current = username

  // Автозаполнение PIN из URL (?pin=XXXXXX)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlPin = params.get("pin")
    if (urlPin && /^\d{6}$/.test(urlPin)) {
      setPin(urlPin)
    }
  }, [location.search])

  useEffect(() => {
    const socket = getSocket()
    const onJoined = ({ pin }: { pin: string }) => {
      setPin(pin)
      playSound("join")
      navigate("/play", { state: { pin, username: nameRef.current } })
    }
    const onError = (key: string) => {
      setBusy(false)
      setError(t(key))
    }
    socket.on(S2C.JOINED, onJoined)
    socket.on(S2C.ERROR, onError)
    return () => {
      socket.off(S2C.JOINED, onJoined)
      socket.off(S2C.ERROR, onError)
    }
  }, [navigate, t, playSound])

  function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setBusy(true)
    playSound("click")
    getSocket().emit(C2S.PLAYER_JOIN, {
      pin: pin.trim(),
      username: username.trim(),
    })
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora-bg" />
      <div className="terminal-grid" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <Card className="w-full max-w-sm">
          <h1 className="mb-6 text-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
            {t("join.title")}
          </h1>

          <form onSubmit={submit} className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-white/60">
                {t("join.pin")}
              </label>
              <Input
                inputMode="numeric"
                maxLength={6}
                placeholder="______"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="text-center text-2xl font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-white/60">
                {t("join.username")}
              </label>
              <Input
                placeholder={t("join.username")}
                value={username}
                maxLength={20}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-answer-red">{error}</p>}

            <Button
              type="submit"
              disabled={busy || pin.length !== 6 || username.trim().length < 2}
              className="mt-1"
            >
              {busy ? "⏳ " + t("join.enter") : t("join.enter")}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
