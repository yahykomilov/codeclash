// Tiny Web Audio SFX — no asset files, works offline.
let ctx: AudioContext | null = null

function tone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.15) {
  if (typeof window === "undefined") return
  try {
    ctx = ctx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.value = vol
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.stop(ctx.currentTime + dur)
  } catch {
    /* audio not available — ignore */
  }
}

export const sound = {
  correct() {
    tone(660, 0.15)
    setTimeout(() => tone(880, 0.22), 110)
  },
  wrong() {
    tone(180, 0.3, "sawtooth", 0.12)
  },
  join() {
    tone(520, 0.12)
  },
}
