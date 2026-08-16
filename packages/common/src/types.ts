export type Locale = "en" | "ru" | "uz"
export const LOCALES: Locale[] = ["en", "ru", "uz"]
export const DEFAULT_LOCALE: Locale = "ru"

export type Category = "html" | "css" | "js" | "react"
export const CATEGORIES: Category[] = ["html", "css", "js", "react"]

export type Difficulty = "easy" | "medium" | "hard"
export type QuestionType = "single" | "multi"

export interface QuestionTranslation {
  question: string
  answers: string[]
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
}

// ── Socket payloads ──────────────────────────────────────
export interface HostCreatePayload {
  quizId: string
  locale: Locale
}
export interface PlayerJoinPayload {
  pin: string
  username: string
}
export interface PlayerAnswerPayload {
  /** selected answer indices */
  answers: number[]
}
