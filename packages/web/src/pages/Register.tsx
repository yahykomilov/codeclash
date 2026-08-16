import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { credentialsSchema } from "@codeclash/common"
import { useAuth } from "../lib/auth"
import { Button, Card, Input } from "../components/ui"
import GoogleButton from "../components/GoogleButton"
import { useSound } from "../lib/sound"

export default function Register() {
  const { t } = useTranslation()
  const { signUp, enabled } = useAuth()
  const navigate = useNavigate()
  const playSound = useSound()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    const parsed = credentialsSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(t(parsed.error.issues[0]?.message ?? "errors.invalidInput"))
      return
    }
    setBusy(true)
    playSound("click")
    const { error } = await signUp(email, password)
    setBusy(false)
    if (error) setError(error)
    else navigate("/host")
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora-bg" />
      <div className="terminal-grid" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <Card className="w-full max-w-sm">
          <h1 className="mb-6 text-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
            {t("auth.register")}
          </h1>

          {!enabled && (
            <p className="mb-4 rounded-lg bg-yellow-500/15 px-3 py-2 text-sm text-yellow-200">
              {t("auth.notConfigured")}
            </p>
          )}

          <form onSubmit={submit} className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-white/60">
                {t("auth.email")}
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-white/60">
                {t("auth.password")}
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-white/40">
                {t("auth.passwordHint")}
              </p>
            </div>

            {error && <p className="text-sm text-answer-red">{error}</p>}

            <Button type="submit" disabled={busy} className="mt-1">
              {busy ? "⏳ " + t("auth.register") : t("auth.register")}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-white/40">
            <span className="h-px flex-1 bg-white/20" />
            {t("auth.or")}
            <span className="h-px flex-1 bg-white/20" />
          </div>

          <GoogleButton onDone={() => navigate("/host")} />

          <p className="mt-6 text-center text-sm text-white/60">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-cyan">
              {t("auth.login")}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
