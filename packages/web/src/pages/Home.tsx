import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-10">
      <div className="text-center">
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          <span className="text-brand-light">Code</span>Clash
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg opacity-80">{t("app.tagline")}</p>
        <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2">
          {["fairScoring", "explains", "noLimit", "trilingual"].map((k) => (
            <span
              key={k}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-light ring-1 ring-brand-light/20"
            >
              {t(`home.badge_${k}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        <Link
          to="/join"
          className="group flex flex-col items-center gap-3 rounded-3xl bg-white/5 p-8 text-center shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
        >
          <span className="text-5xl">🎮</span>
          <span className="text-2xl font-extrabold">{t("home.player")}</span>
          <span className="opacity-75">{t("home.joinDesc")}</span>
        </Link>

        <Link
          to="/host"
          className="group flex flex-col items-center gap-3 rounded-3xl bg-brand/20 p-8 text-center shadow-xl ring-1 ring-brand-light/30 backdrop-blur transition hover:-translate-y-1 hover:bg-brand/30"
        >
          <span className="text-5xl">🎤</span>
          <span className="text-2xl font-extrabold">{t("home.host")}</span>
          <span className="opacity-75">{t("home.hostDesc")}</span>
        </Link>
      </div>
    </div>
  )
}
