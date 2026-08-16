import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../lib/auth"

/**
 * Google sign-in. With Supabase configured this triggers the real OAuth
 * redirect; `onDone` is used only for the demo (no-redirect) fallback.
 */
export default function GoogleButton({ onDone }: { onDone?: () => void }) {
  const { t } = useTranslation()
  const { signInWithGoogle, enabled } = useAuth()
  const [error, setError] = useState("")

  async function click() {
    const { error } = await signInWithGoogle()
    if (error) {
      // Demo mode: no real provider — let the host continue anyway.
      if (!enabled) onDone?.()
      else setError(error)
    }
  }

  return (
    <div>
      <button
        onClick={click}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 font-bold text-gray-800 shadow-lg transition hover:bg-gray-100 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.2-3.1-.5-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7C43.7 37.9 46.5 31.8 46.5 24.5z" />
          <path fill="#FBBC05" d="M10.4 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.8-6.1z" />
          <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.6l-7.3-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.8-3.8-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
        {t("auth.google")}
      </button>
      {error && <p className="mt-2 text-sm text-answer-red">{error}</p>}
    </div>
  )
}
