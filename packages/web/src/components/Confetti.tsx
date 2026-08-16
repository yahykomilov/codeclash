import { useEffect, useState } from "react"

interface ConfettiProps {
  active: boolean
  count?: number
}

export function Confetti({ active, count = 100 }: ConfettiProps) {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; rotation: number }>>([])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    const colors = ["#a855f7", "#06b6d4", "#ec4899", "#22c55e", "#f59e0b", "#ef4444"]
    const newPieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))

    setPieces(newPieces)

    const timer = setTimeout(() => {
      setPieces([])
    }, 3000)

    return () => clearTimeout(timer)
  }, [active, count])

  if (!active || pieces.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
