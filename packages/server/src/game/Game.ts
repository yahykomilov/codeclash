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
  type ScoringMode,
} from "@codeclash/common"

interface AnswerRecord {
  answers: number[]
  elapsedMs: number
}

export type GamePhase = "lobby" | "question" | "reveal" | "finished"

const MAX_PLAYERS = 200

/**
 * One live quiz room. Authoritative over timing and scoring; broadcasts to a
 * socket.io room whose name equals the PIN. The host socket is in the room too.
 *
 * Answer order is reshuffled per question and correctness is tracked in that
 * shuffled ("display") space, so screen-shared "click the red one" cheats and
 * memorised positions from a previous game both break.
 */
export class Game {
  phase: GamePhase = "lobby"
  currentIndex = -1
  readonly players = new Map<string, Player>()

  private readonly answers = new Map<string, AnswerRecord>()
  private questionStart = 0
  private timer: NodeJS.Timeout | null = null
  private displayCorrect: number[] = []
  private answerCount = 4
  private explanation?: string

  constructor(
    private readonly io: Server,
    readonly pin: string,
    public hostId: string,
    private readonly questions: Question[],
    private readonly locale: Locale,
    private readonly scoringMode: ScoringMode,
    private readonly onEnd: () => void,
  ) {}

  get currentQuestion(): Question {
    return this.questions[this.currentIndex]
  }

  playerList(): Player[] {
    return [...this.players.values()]
  }

  /** Returns the created player, or null if the room is full. */
  addPlayer(id: string, username: string): Player | null {
    if (this.players.size >= MAX_PLAYERS) return null
    const player: Player = { id, username: this.uniqueName(username), points: 0, streak: 0 }
    this.players.set(id, player)
    return player
  }

  private uniqueName(name: string): string {
    const taken = new Set(this.playerList().map((p) => p.username.toLowerCase()))
    if (!taken.has(name.toLowerCase())) return name
    let n = 2
    while (taken.has(`${name} (${n})`.toLowerCase())) n++
    return `${name} (${n})`
  }

  removePlayer(id: string): void {
    this.players.delete(id)
    this.answers.delete(id)
  }

  reassignHost(id: string): void {
    this.hostId = id
  }

  start(): void {
    if (this.phase === "lobby") this.next()
  }

  /** Advance to the next question. Guarded: never interrupts a live question. */
  next(): void {
    if (this.phase === "question") return
    if (this.currentIndex + 1 >= this.questions.length) {
      this.finish()
      return
    }
    this.currentIndex++
    this.sendQuestion()
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  private sendQuestion(): void {
    this.clearTimer()
    this.phase = "question"
    this.answers.clear()
    this.questionStart = Date.now()
    const q = this.currentQuestion
    const t = q.translations[this.locale] ?? q.translations.en
    const n = t.answers.length

    // Shuffle display order; map correctness into the shuffled space.
    const perm = this.shuffledIndices(n)
    const displayAnswers = perm.map((oi) => t.answers[oi])
    this.displayCorrect = perm
      .map((oi, d) => (q.correct.includes(oi) ? d : -1))
      .filter((d) => d >= 0)
    this.answerCount = n
    this.explanation = t.explanation

    const pub: PublicQuestion = {
      index: this.currentIndex,
      total: this.questions.length,
      category: q.category,
      type: q.type,
      question: t.question,
      answers: displayAnswers,
      time: q.time,
    }
    this.io.to(this.pin).emit(S2C.QUESTION, pub)
    this.timer = setTimeout(() => this.closeQuestion(), q.time * 1000)
  }

  private shuffledIndices(n: number): number[] {
    const a = [...Array(n).keys()]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  submitAnswer(id: string, raw: number[]): void {
    if (this.phase !== "question") return
    if (!this.players.has(id)) return
    if (this.answers.has(id)) return
    // Sanitise: unique, integer, in-range indices only.
    const answers = [...new Set(raw)].filter(
      (a) => Number.isInteger(a) && a >= 0 && a < this.answerCount,
    )
    if (answers.length === 0) return
    this.answers.set(id, { answers, elapsedMs: Date.now() - this.questionStart })
    this.io.to(this.pin).emit(S2C.ANSWER_COUNT, this.answers.size)
    this.maybeAutoClose()
  }

  /** Close early once everyone still present has answered. */
  maybeAutoClose(): void {
    if (this.phase !== "question") return
    if (this.players.size > 0 && this.answers.size >= this.players.size) {
      this.closeQuestion()
    }
  }

  closeQuestion(): void {
    if (this.phase !== "question") return
    this.clearTimer()
    this.phase = "reveal"
    const q = this.currentQuestion
    const votes = new Array<number>(this.answerCount).fill(0)

    for (const rec of this.answers.values()) {
      for (const a of rec.answers) {
        if (a >= 0 && a < votes.length) votes[a]++
      }
    }

    for (const [id, player] of this.players) {
      const rec = this.answers.get(id)
      const correct = rec ? isAnswerCorrect(rec.answers, this.displayCorrect) : false
      const gained = computeScore({
        correct,
        elapsedMs: rec?.elapsedMs ?? q.time * 1000,
        windowMs: q.time * 1000,
        streak: player.streak,
        mode: this.scoringMode,
      })
      player.streak = correct ? player.streak + 1 : 0
      player.points += gained
      player.lastGain = gained
      player.lastAnswerCorrect = correct
    }

    const board = this.leaderboard()
    this.io.to(this.pin).emit(S2C.REVEAL, {
      correct: this.displayCorrect,
      votes,
      explanation: this.explanation,
    })
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
    this.clearTimer()
    this.io.to(this.pin).emit(S2C.FINISHED, { podium: this.leaderboard().slice(0, 3) })
    this.onEnd()
  }

  leaderboard(): LeaderboardEntry[] {
    return this.playerList()
      .sort((a, b) => b.points - a.points)
      .map((p, i) => ({ id: p.id, username: p.username, points: p.points, rank: i + 1 }))
  }

  dispose(): void {
    this.clearTimer()
  }
}
