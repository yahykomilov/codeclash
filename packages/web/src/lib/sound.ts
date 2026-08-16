import { useEffect, useRef } from "react"

type SoundType = "correct" | "wrong" | "join" | "click" | "tick" | "timeup"

type OscillatorType = "sine" | "square" | "sawtooth" | "triangle"

const soundFrequencies: Record<SoundType, { freq: number; duration: number; type: OscillatorType }> = {
  correct: { freq: 523.25, duration: 0.3, type: "sine" }, // C5
  wrong: { freq: 196.0, duration: 0.4, type: "square" }, // G3
  join: { freq: 349.23, duration: 0.2, type: "sine" }, // F4
  click: { freq: 880, duration: 0.05, type: "sine" }, // A5
  tick: { freq: 261.63, duration: 0.05, type: "sine" }, // C4
  timeup: { freq: 130.81, duration: 0.5, type: "sawtooth" }, // C3
}

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null)

  const play = (type: SoundType) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const ctx = audioContextRef.current
    if (!ctx) return

    const { freq, duration, type: oscType } = soundFrequencies[type]

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
    oscillator.type = oscType

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      audioContextRef.current?.close()
    }
  }, [])

  return play
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  return children
}