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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-black/20 px-5 py-4 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
          <img src="/logo-icon.png" alt="" className="h-9 w-9 drop-shadow-[0_0_12px_rgba(139,92,255,0.55)]" />
          <span>
            <span className="text-gradient">Code</span>
            <span className="text-white">Clash</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user && (
            <button
              onClick={signOut}
              className="text-sm opacity-80 transition hover:opacity-100"
            >
              {t("auth.logout")}
            </button>
          )}
        </div>
      </header>
      <main className="flex flex-1 flex-col">
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
