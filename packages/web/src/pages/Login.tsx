import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../lib/auth"
import { Button, Card, Input } from "../components/ui"
import GoogleButton from "../components/GoogleButton"

export default function Login() {
  const { t } = useTranslation()
  const { signIn, enabled } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) setError(error)
    else navigate("/host")
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <Card className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-3xl font-black">{t("auth.login")}</h1>

        {!enabled && (
          <p className="mb-4 rounded-lg bg-yellow-500/15 px-3 py-2 text-sm text-yellow-200">
            {t("auth.notConfigured")}
          </p>
        )}

        <form onSubmit={submit} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder={t("auth.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-answer-red">{error}</p>}
          <Button type="submit" disabled={busy} className="mt-1">
            {t("auth.login")}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs opacity-60">
          <span className="h-px flex-1 bg-white/20" />
          {t("auth.or")}
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <GoogleButton onDone={() => navigate("/host")} />

        <p className="mt-6 text-center text-sm opacity-75">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="font-bold text-brand-light">
            {t("auth.register")}
          </Link>
        </p>
      </Card>
    </div>
  )
}
