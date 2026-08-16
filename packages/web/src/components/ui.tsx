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
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-b from-brand to-brand-dark
        px-6 py-3 font-black text-white
        shadow-lg shadow-brand/30
        transition-all duration-200
        hover:from-brand-dark hover:to-brand
        hover:shadow-xl hover:shadow-brand/50
        hover:-translate-y-0.5
        active:scale-95
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
    <div
      className={`
        relative rounded-2xl
        bg-white/5
        p-6
        shadow-xl shadow-black/30
        ring-1 ring-white/10
        backdrop-blur-xl
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-brand/10 before:via-transparent before:to-cyan/5
        before:opacity-50
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-xl
        bg-white/5
        border-2 border-white/10
        px-4 py-3 text-lg text-white
        placeholder:text-white/40
        outline-none
        transition-all duration-200
        focus:border-brand-light
        focus:shadow-lg focus:shadow-brand/30
        ${className}
      `}
    />
  )
}

export function NeonCard({
  children,
  className = "",
  glow = "purple",
}: {
  children: ReactNode
  className?: string
  glow?: "purple" | "cyan" | "pink" | "green"
}) {
  const glowMap = {
    purple: "shadow-[0_0_30px_rgba(124,54,234,0.4)]",
    cyan: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    pink: "shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    green: "shadow-[0_0_30px_rgba(34,197,94,0.4)]",
  }

  return (
    <div
      className={`
        relative rounded-2xl
        bg-white/5
        p-6
        ring-1 ring-white/10
        backdrop-blur-xl
        transition-all duration-300
        hover:ring-brand-light/30
        ${glowMap[glow]}
        ${className}
      `}
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-brand/20 via-transparent to-cyan/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
      {children}
    </div>
  )
}

export function GlitchText({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={`
        relative inline-block
        text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-cyan to-pink
        ${className}
      `}
      data-text={text}
    >
      {text}
      <style>{`
        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); transform: translate(0); }
          10% { clip: rect(12px, 9999px, 66px, 0); transform: translate(-2px, -2px); }
          20% { clip: rect(72px, 9999px, 100px, 0); transform: translate(-2px, 2px); }
          30% { clip: rect(32px, 9999px, 54px, 0); transform: translate(0); }
          40% { clip: rect(62px, 9999px, 84px, 0); transform: translate(-2px, -2px); }
          50% { clip: rect(12px, 9999px, 34px, 0); transform: translate(0); }
          60% { clip: rect(52px, 9999px, 90px, 0); transform: translate(2px, 2px); }
          70% { clip: rect(22px, 9999px, 44px, 0); transform: translate(0); }
          80% { clip: rect(62px, 9999px, 84px, 0); transform: translate(-2px, 2px); }
          90% { clip: rect(32px, 9999px, 54px, 0); transform: translate(2px, -2px); }
          100% { clip: rect(42px, 9999px, 44px, 0); transform: translate(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .glitch-text:hover {
            animation: glitch-anim 3s infinite;
          }
        }
      `}</style>
    </span>
  )
}
