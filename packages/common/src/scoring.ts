export const MAX_POINTS = 1000
export const STREAK_STEP = 100
export const MAX_STREAK_BONUS = 5

/**
 * Time-weighted score. A correct answer is worth half of MAX_POINTS just for
 * being right, plus up to half more the faster it arrives, plus a streak bonus.
 */
export function computeScore(opts: {
  correct: boolean
  elapsedMs: number
  windowMs: number
  streak: number
}): number {
  if (!opts.correct) return 0
  const ratio = Math.max(0, Math.min(1, 1 - opts.elapsedMs / opts.windowMs))
  const base = Math.round(MAX_POINTS * (0.5 + 0.5 * ratio))
  const bonus = Math.min(opts.streak, MAX_STREAK_BONUS) * STREAK_STEP
  return base + bonus
}

/** Exact-set match: for multi-answer, the whole set must match. */
export function isAnswerCorrect(selected: number[], solution: number[]): boolean {
  if (selected.length !== solution.length) return false
  const a = [...selected].sort((x, y) => x - y)
  const b = [...solution].sort((x, y) => x - y)
  return a.every((v, i) => v === b[i])
}
