export type Locale = "en" | "ru" | "uz"
export const LOCALES: Locale[] = ["en", "ru", "uz"]
export const DEFAULT_LOCALE: Locale = "ru"

export type Category = "html" | "css" | "js" | "react"
export const CATEGORIES: Category[] = ["html", "css", "js", "react"]

export type Difficulty = "easy" | "medium" | "hard"
export type QuestionType = "single" | "multi"

/**
 * Scoring mode (counter to Kahoot's #1 complaint — speed punishing thoughtful players):
 * - classic:  50% for correct + up to 50% for speed (Kahoot-like)
 * - accuracy: full points for ANY correct answer, speed ignored
 * - hybrid:   80% for correct + small 20% speed tiebreaker
 */
export type ScoringMode = "classic" | "accuracy" | "hybrid"
export const SCORING_MODES: ScoringMode[] = ["accuracy", "hybrid", "classic"]

export interface QuestionTranslation {
  question: string
  answers: string[]
  explanation?: string
}

/**
 * A quiz question. `correct` holds indices into `answers` and is
 * language-independent, so a single question serves all locales.
 */
export interface Question {
  id: string
  category: Category
  difficulty: Difficulty
  type: QuestionType
  /** Answer window in seconds. */
  time: number
  /** Indices of correct answers. length 1 = single, >1 = multi. */
  correct: number[]
  translations: Record<Locale, QuestionTranslation>
}

export interface Quiz {
  id: string
  title: string
  category: Category | "mixed"
  questionIds: string[]
}

export interface Player {
  id: string
  username: string
  points: number
  streak: number
  lastGain?: number
  lastAnswerCorrect?: boolean
}

export type GamePhase = "lobby" | "question" | "reveal" | "leaderboard" | "finished"

/** Question shape sent to clients — never includes `correct`. */
export interface PublicQuestion {
  index: number
  total: number
  category: Category
  type: QuestionType
  question: string
  answers: string[]
  time: number
}

export interface RevealPayload {
  correct: number[]
  /** votes[i] = number of players who picked answer i */
  votes: number[]
  /** Why the correct answer is right (counter to "Kahoot doesn't teach"). */
  explanation?: string
}

export interface LeaderboardEntry {
  id: string
  username: string
  points: number
  rank: number
}

export interface PlayerResult {
  correct: boolean
  gained: number
  points: number
  rank: number
  streak: number
  /** True when the comeback bonus boosted this gain (player was trailing). */
  comeback?: boolean
}

// ── Socket payloads ──────────────────────────────────────
export interface HostCreatePayload {
  quizId: string
  locale: Locale
  scoringMode?: ScoringMode
  /** Chill mode: players see only their own rank, no public leaderboard stress. */
  privateRank?: boolean
}
export interface PlayerJoinPayload {
  pin: string
  username: string
}
export interface PlayerAnswerPayload {
  /** selected answer indices */
  answers: number[]
}
