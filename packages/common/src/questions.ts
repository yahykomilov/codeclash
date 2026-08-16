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

export function resolveQuizQuestions(quizId: string, limit = 10): Question[] {
  const quiz = QUIZZES.find((q) => q.id === quizId)
  if (!quiz) return []
  const pool =
    quiz.category === "mixed"
      ? QUESTIONS
      : getQuestionsByCategory(quiz.category)
  return pool.slice(0, limit)
}
