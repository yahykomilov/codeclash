import type { Category, Question, Quiz } from "./types"
import { QUESTIONS } from "./questions.data"

export { QUESTIONS }

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id)
}

export function getQuestionsByCategory(category: Category): Question[] {
  return QUESTIONS.filter((q) => q.category === category)
}

/** Built-in quizzes a host can pick from. `mixed` pulls from all categories. */
export const QUIZZES: Quiz[] = [
  { id: "mixed", title: "Full Stack Mix", category: "mixed", questionIds: [] },
  { id: "html", title: "HTML Basics", category: "html", questionIds: [] },
  { id: "css", title: "CSS Mastery", category: "css", questionIds: [] },
  { id: "js", title: "JavaScript Core", category: "js", questionIds: [] },
  { id: "react", title: "React Essentials", category: "react", questionIds: [] },
]

/** Fisher–Yates shuffle (new array). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Round-robin interleave by category so "mixed" is genuinely mixed, not all-HTML. */
function interleaveByCategory(questions: Question[]): Question[] {
  const byCat = new Map<Category, Question[]>()
  for (const q of questions) {
    if (!byCat.has(q.category)) byCat.set(q.category, [])
    byCat.get(q.category)!.push(q)
  }
  const lanes = [...byCat.values()].map((lane) => shuffle(lane))
  const out: Question[] = []
  let added = true
  while (added) {
    added = false
    for (const lane of lanes) {
      const next = lane.shift()
      if (next) {
        out.push(next)
        added = true
      }
    }
  }
  return out
}

/**
 * Resolve a quiz to its questions. Questions are shuffled every game so repeat
 * players can't memorise the order (counter to Kahoot's fixed-position exploit).
 */
export function resolveQuizQuestions(quizId: string, limit = 10): Question[] {
  const quiz = QUIZZES.find((q) => q.id === quizId)
  if (!quiz) return []
  const ordered =
    quiz.category === "mixed"
      ? interleaveByCategory(QUESTIONS)
      : shuffle(getQuestionsByCategory(quiz.category))
  return ordered.slice(0, limit)
}
