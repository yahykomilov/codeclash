import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const BADGES = ["fairScoring", "explains", "noLimit", "trilingual"]

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-12">
      <div className="text-center">
        <div
          className="animate-rise font-code text-[0.7rem] uppercase tracking-[0.5em] text-neon-cyan/80"
          style={{ animationDelay: "0s" }}
        >
          &lt;/ real-time it quiz &gt;
        </div>
        <h1
          className="animate-rise font-display text-6xl font-bold leading-none tracking-tight sm:text-8xl"
          style={{ animationDelay: "0.06s" }}
        >
          <span className="text-gradient">Code</span>
          <span className="text-white">Clash</span>
        </h1>
        <p
          className="animate-rise mx-auto mt-5 max-w-md text-lg text-white/70"
          style={{ animationDelay: "0.12s" }}
        >
          {t("app.tagline")}
        </p>
        <div
          className="animate-rise mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2"
          style={{ animationDelay: "0.18s" }}
        >
          {BADGES.map((k) => (
            <span
              key={k}
              className="rounded-full border border-neon-violet/25 bg-neon-violet/10 px-3 py-1 font-code text-xs text-brand-light"
            >
              {t(`home.badge_${k}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        <Link
          to="/join"
          className="group animate-rise relative flex flex-col gap-3 overflow-hidden rounded-3xl glass p-8 transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring"
          style={{ animationDelay: "0.26s" }}
        >
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-neon-cyan via-neon-cyan/40 to-transparent" />
          <span className="animate-floaty text-5xl">🎮</span>
          <span className="font-display text-2xl font-bold">{t("home.player")}</span>
          <span className="text-white/55">{t("home.joinDesc")}</span>
          <span className="mt-1 font-code text-sm text-neon-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            join →
          </span>
        </Link>

        <Link
          to="/host"
          className="group animate-rise relative flex flex-col gap-3 overflow-hidden rounded-3xl glass p-8 transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring"
          style={{ animationDelay: "0.32s" }}
        >
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-neon-violet via-neon-violet/40 to-transparent" />
          <span className="animate-floaty text-5xl" style={{ animationDelay: "0.4s" }}>
            🎤
          </span>
          <span className="font-display text-2xl font-bold">{t("home.host")}</span>
          <span className="text-white/55">{t("home.hostDesc")}</span>
          <span className="mt-1 font-code text-sm text-brand-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            create →
          </span>
        </Link>
      </div>
    </div>
  )
}
