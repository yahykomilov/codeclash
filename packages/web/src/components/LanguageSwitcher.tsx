import { useTranslation } from "react-i18next"

const LANGS = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  return (
    <div className="flex gap-1 rounded-full bg-white/10 p-1">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => {
            i18n.changeLanguage(l.code)
            localStorage.setItem("locale", l.code)
          }}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
            i18n.language === l.code ? "bg-brand text-white" : "opacity-70 hover:opacity-100"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
