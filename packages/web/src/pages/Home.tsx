import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { QRCode } from "../components/QRCode"
import { NeonCard, GlitchText } from "../components/ui"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Аурора + сетка */}
      <div className="aurora-bg" />
      <div className="terminal-grid" />

      {/* Плавающие элементы */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-8xl opacity-5">
          <GlitchText text=">" />
        </div>
        <div className="absolute bottom-20 right-10 text-7xl opacity-5">
          <GlitchText text="{ }" />
        </div>
        <div className="absolute top-1/3 left-1/4 text-6xl opacity-5">
          <GlitchText text="⚡" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-5xl opacity-5">
          <GlitchText text="∞" />
        </div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-6 py-10">
        {/* Логотип + слоган */}
        <div className="text-center">
          <h1 className="relative text-6xl font-black tracking-tight sm:text-8xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-cyan to-pink">
              Code
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink via-brand-light to-cyan">
              Clash
            </span>
            <style>{`
              @keyframes logo-pulse {
                0%, 100% { filter: brightness(1) saturate(1); }
                50% { filter: brightness(1.2) saturate(1.3); }
              }
              .logo-anim {
                animation: logo-pulse 3s ease-in-out infinite;
              }
            `}</style>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
            {t("app.tagline")}
          </p>
        </div>

        {/* Контр-фичи Kahoot */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-brand/20 to-cyan/20 px-4 py-1.5 text-xs font-bold ring-1 ring-brand-light/30">
            ✅ {t("features.honestScoring")}
          </span>
          <span className="rounded-full bg-gradient-to-r from-brand/20 to-pink/20 px-4 py-1.5 text-xs font-bold ring-1 ring-pink/30">
            📖 {t("features.explanations")}
          </span>
          <span className="rounded-full bg-gradient-to-r from-brand/20 to-green/20 px-4 py-1.5 text-xs font-bold ring-1 ring-green/30">
            ∞ {t("features.unlimitedPlayers")}
          </span>
          <span className="rounded-full bg-gradient-to-r from-brand/20 to-yellow/20 px-4 py-1.5 text-xs font-bold ring-1 ring-yellow/30">
            🔒 {t("features.security")}
          </span>
        </div>

        {/* Карточки выбора */}
        <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          <Link
            to="/join"
            className="group relative"
          >
            <NeonCard glow="cyan" className="h-full cursor-pointer flex-col items-center text-center">
              <div className="mb-4 text-6xl">🎮</div>
              <h2 className="mb-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white">
                {t("home.player")}
              </h2>
              <p className="text-sm text-white/60">{t("home.joinDesc")}</p>
              <div className="mt-4 text-xs text-white/40">
                📱 {t("features.mobileOptimized")}
              </div>
            </NeonCard>
          </Link>

          <Link
            to="/host"
            className="group relative"
          >
            <NeonCard glow="purple" className="h-full cursor-pointer flex-col items-center text-center">
              <div className="mb-4 text-6xl">🎤</div>
              <h2 className="mb-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple to-white">
                {t("home.host")}
              </h2>
              <p className="text-sm text-white/60">{t("home.hostDesc")}</p>
              <div className="mt-4 text-xs text-white/40">
                📺 {t("features.bigScreen")}
              </div>
            </NeonCard>
          </Link>
        </div>

        {/* QR-код для демо */}
        <div className="mt-8 text-center">
          <p className="mb-3 text-sm text-white/60">{t("home.demoQR")}</p>
          <div className="flex items-center justify-center gap-4">
            <QRCode pin="123456" size={120} />
            <div className="text-left text-sm">
              <p className="font-bold text-brand-light">Demo PIN: 123456</p>
              <p className="text-white/60">{t("home.scanToJoin")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
