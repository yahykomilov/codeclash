import type { Server } from "socket.io"
import {
  S2C,
  computeScore,
  isAnswerCorrect,
  type LeaderboardEntry,
  type Locale,
  type Player,
  type PublicQuestion,
  type Question,
} from "@codeclash/common"

interface AnswerRecord {
  answers: number[]
  elapsedMs: number
}

export type GamePhase = "lobby" | "question" | "reveal" | "finished"

/**
 * One live quiz room. Authoritative over timing and scoring; broadcasts to a
 * socket.io room whose name equals the PIN. The host socket is in the room too.
 */
export class Game {
  phase: GamePhase = "lobby"
  currentIndex = -1
  readonly players = new Map<string, Player>()

  private readonly answers = new Map<string, AnswerRecord>()
  private questionStart = 0
  private timer: NodeJS.Timeout | null = null

  constructor(
    private readonly io: Server,
    readonly pin: string,
    readonly hostId: string,
    private readonly questions: Question[],
    private readonly locale: Locale,
  ) {}

  get currentQuestion(): Question {
    return this.questions[this.currentIndex]
  }

  playerList(): Player[] {
    return [...this.players.values()]
  }

  addPlayer(id: string, username: string): Player {
    const player: Player = { id, username, points: 0, streak: 0 }
    this.players.set(id, player)
    return player
  }

  removePlayer(id: string): void {
    this.players.delete(id)
    this.answers.delete(id)
  }

  /** Kick off the game from the lobby. */
  start(): void {
    if (this.phase !== "lobby") return
    this.next()
  }

  next(): void {
    if (this.currentIndex + 1 >= this.questions.length) {
      this.finish()
      return
    }
    this.currentIndex++
    this.sendQuestion()
  }

  private sendQuestion(): void {
    this.phase = "question"
    this.answers.clear()
    this.questionStart = Date.now()
    const q = this.currentQuestion
    const t = q.translations[this.locale] ?? q.translations.en
    const pub: PublicQuestion = {
      index: this.currentIndex,
      total: this.questions.length,
      category: q.category,
      type: q.type,
      question: t.question,
      answers: t.answers,
      time: q.time,
    }
    this.io.to(this.pin).emit(S2C.QUESTION, pub)
    this.timer = setTimeout(() => this.closeQuestion(), q.time * 1000)
  }

  submitAnswer(id: string, answers: number[]): void {
    if (this.phase !== "question") return
    if (!this.players.has(id)) return
    if (this.answers.has(id)) return
    this.answers.set(id, { answers, elapsedMs: Date.now() - this.questionStart })
    this.io.to(this.pin).emit(S2C.ANSWER_COUNT, this.answers.size)
    if (this.players.size > 0 && this.answers.size >= this.players.size) {
      this.closeQuestion()
    }
  }

  /** End the current question: score everyone, reveal, broadcast leaderboard. */
  closeQuestion(): void {
    if (this.phase !== "question") return
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.phase = "reveal"
    const q = this.currentQuestion
    const votes = new Array<number>(q.translations[this.locale]?.answers.length ?? 4).fill(0)

    for (const rec of this.answers.values()) {
      for (const a of rec.answers) {
        if (a >= 0 && a < votes.length) votes[a]++
      }
    }

    for (const [id, player] of this.players) {
      const rec = this.answers.get(id)
      const correct = rec ? isAnswerCorrect(rec.answers, q.correct) : false
      const gained = computeScore({
        correct,
        elapsedMs: rec?.elapsedMs ?? q.time * 1000,
        windowMs: q.time * 1000,
        streak: player.streak,
      })
      player.streak = correct ? player.streak + 1 : 0
      player.points += gained
      player.lastGain = gained
      player.lastAnswerCorrect = correct
    }

    const board = this.leaderboard()
    this.io.to(this.pin).emit(S2C.REVEAL, { correct: q.correct, votes })
    this.io.to(this.pin).emit(S2C.LEADERBOARD, board)

    for (const [id, player] of this.players) {
      const rank = board.find((b) => b.id === id)?.rank ?? this.players.size
      this.io.to(id).emit(S2C.PLAYER_RESULT, {
        correct: player.lastAnswerCorrect ?? false,
        gained: player.lastGain ?? 0,
        points: player.points,
        rank,
        streak: player.streak,
      })
    }
  }

  private finish(): void {
    this.phase = "finished"
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.io.to(this.pin).emit(S2C.FINISHED, { podium: this.leaderboard().slice(0, 3) })
  }

  leaderboard(): LeaderboardEntry[] {
    return this.playerList()
      .sort((a, b) => b.points - a.points)
      .map((p, i) => ({ id: p.id, username: p.username, points: p.points, rank: i + 1 }))
  }

  dispose(): void {
    if (this.timer) clearTimeout(this.timer)
  }
}
