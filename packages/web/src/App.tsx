import { Link, Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "./lib/auth"
import LanguageSwitcher from "./components/LanguageSwitcher"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Join from "./pages/Join"
import Play from "./pages/Play"
import Host from "./pages/Host"

export default function App() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="aurora-bg" />
      <div className="terminal-grid" />

      <header className="relative z-10 flex items-center justify-between px-5 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-cyan to-pink">
            Code
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink via-brand-light to-cyan">
            Clash
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user && (
            <button
              onClick={signOut}
              className="text-sm font-bold text-white/70 transition hover:text-white"
            >
              {t("auth.logout")}
            </button>
          )}
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/join" element={<Join />} />
          <Route path="/play" element={<Play />} />
          <Route path="/host" element={<Host />} />
        </Routes>
      </main>
    </div>
  )
}
