import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { C2S, S2C } from "@codeclash/common"
import { getSocket } from "../lib/socket"
import { Button, Card, Input } from "../components/ui"

export default function Join() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [pin, setPin] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const nameRef = useRef("")
  nameRef.current = username

  useEffect(() => {
    const socket = getSocket()
    const onJoined = ({ pin }: { pin: string }) => {
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
  }, [navigate, t])

  function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setBusy(true)
    getSocket().emit(C2S.PLAYER_JOIN, {
      pin: pin.trim(),
      username: username.trim(),
    })
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <Card className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-3xl font-black">{t("join.title")}</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <Input
            inputMode="numeric"
            maxLength={6}
            placeholder={t("join.pin")}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="text-center text-2xl font-black tracking-[0.4em]"
            required
          />
          <Input
            placeholder={t("join.username")}
            value={username}
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && <p className="text-sm text-answer-red">{error}</p>}
          <Button
            type="submit"
            disabled={busy || pin.length !== 6 || username.trim().length < 2}
          >
            {t("join.enter")}
          </Button>
        </form>
      </Card>
    </div>
  )
}
