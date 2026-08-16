import type { ScoringMode } from "./types"

export const MAX_POINTS = 1000
export const STREAK_STEP = 100
export const MAX_STREAK_BONUS = 5

/**
 * Score a correct answer under the chosen mode. Wrong answers score 0.
 * `accuracy` mode is the headline counter to Kahoot's fastest-finger unfairness:
 * being right is worth the same for everyone, regardless of speed.
 */
export function computeScore(opts: {
  correct: boolean
  elapsedMs: number
  windowMs: number
  streak: number
  mode: ScoringMode
}): number {
  if (!opts.correct) return 0
  const streakBonus = Math.min(opts.streak, MAX_STREAK_BONUS) * STREAK_STEP

  if (opts.mode === "accuracy") {
    return MAX_POINTS + streakBonus
  }

  const ratio = Math.max(0, Math.min(1, 1 - opts.elapsedMs / opts.windowMs))
  if (opts.mode === "hybrid") {
    return Math.round(MAX_POINTS * (0.8 + 0.2 * ratio)) + streakBonus
  }
  // classic
  return Math.round(MAX_POINTS * (0.5 + 0.5 * ratio)) + streakBonus
}

/** Exact-set match: for multi-answer, the whole set must match. */
export function isAnswerCorrect(selected: number[], solution: number[]): boolean {
  if (selected.length !== solution.length) return false
  const a = [...selected].sort((x, y) => x - y)
  const b = [...solution].sort((x, y) => x - y)
  return a.every((v, i) => v === b[i])
}
