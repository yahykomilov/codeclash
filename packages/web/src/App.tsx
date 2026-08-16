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
      <header className="flex items-center justify-between px-5 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight">
          <span className="text-brand-light">Code</span>Clash
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
