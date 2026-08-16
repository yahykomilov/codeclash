import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react"

export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-b from-brand to-brand-dark px-6 py-3 font-display font-bold tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(139,92,255,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_46px_-8px_rgba(139,92,255,1)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </button>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`glass rounded-2xl p-6 shadow-2xl ${className}`}>{children}</div>
  )
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-lg outline-none transition placeholder:text-white/35 focus:border-brand/60 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(139,92,255,0.25)] ${className}`}
    />
  )
}
