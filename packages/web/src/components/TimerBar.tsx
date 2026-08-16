import { useEffect, useState } from "react"

interface TimerBarProps {
  seconds: number
  total: number
  className?: string
}

export function TimerBar({ seconds, total, className = "" }: TimerBarProps) {
  const [width, setWidth] = useState(100)

  useEffect(() => {
    const percent = (seconds / total) * 100
    setWidth(percent)
  }, [seconds, total])

  const getColorClass = () => {
    const percent = (seconds / total) * 100
    if (percent <= 30) return "bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"
    if (percent <= 60) return "bg-gradient-to-r from-yellow-400 to-orange-500"
    return "bg-gradient-to-r from-green-400 to-cyan-400"
  }

  return (
    <div className={`relative h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${getColorClass()}`}
        style={{ width: `${width}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{seconds}s</span>
      </div>
    </div>
  )
}

export function TimerBarVertical({ seconds, total, className = "" }: TimerBarProps) {
  const [height, setHeight] = useState(100)

  useEffect(() => {
    const percent = (seconds / total) * 100
    setHeight(percent)
  }, [seconds, total])

  const getColorClass = () => {
    const percent = (seconds / total) * 100
    if (percent <= 30) return "bg-gradient-to-t from-red-500 to-orange-500 animate-pulse"
    if (percent <= 60) return "bg-gradient-to-t from-yellow-400 to-orange-500"
    return "bg-gradient-to-t from-green-400 to-cyan-400"
  }

  return (
    <div className={`relative h-40 w-3 overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className={`absolute bottom-0 w-full rounded-full transition-all duration-300 ${getColorClass()}`}
        style={{ height: `${height}%` }}
      />
    </div>
  )
}
