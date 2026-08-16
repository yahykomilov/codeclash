import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, supabaseEnabled } from "./supabase"

interface AuthResult {
  error?: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  enabled: boolean
  signUp: (email: string, password: string) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signInWithGoogle: () => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      enabled: supabaseEnabled,
      async signUp(email, password) {
        if (!supabase) return { error: "errors.authNotConfigured" }
        const { error } = await supabase.auth.signUp({ email, password })
        return { error: error?.message }
      },
      async signIn(email, password) {
        if (!supabase) return { error: "errors.authNotConfigured" }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error?.message }
      },
      async signInWithGoogle() {
        if (!supabase) return { error: "errors.authNotConfigured" }
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/host` },
        })
        return { error: error?.message }
      },
      async signOut() {
        await supabase?.auth.signOut()
        setUser(null)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
