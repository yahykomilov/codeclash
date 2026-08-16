import type { Server } from "socket.io"
import type { Locale, Question, ScoringMode } from "@codeclash/common"
import { Game } from "./Game"
import { generatePin } from "./pin"

const MAX_GAMES = 500

/** Registry of all live games, keyed by PIN. */
export class GameManager {
  private readonly games = new Map<string, Game>()

  /** Returns the new game, or null if the server is at capacity. */
  create(
    io: Server,
    hostId: string,
    questions: Question[],
    locale: Locale,
    scoringMode: ScoringMode,
    privateRank: boolean,
  ): Game | null {
    if (this.games.size >= MAX_GAMES) return null
    const pin = generatePin((p) => this.games.has(p))
    // onEnd auto-removes the game when it finishes, so rooms don't leak.
    const game = new Game(io, pin, hostId, questions, locale, scoringMode, privateRank, () =>
      this.remove(pin),
    )
    this.games.set(pin, game)
    return game
  }

  get(pin: string | undefined): Game | undefined {
    return pin ? this.games.get(pin) : undefined
  }

  remove(pin: string): void {
    this.games.get(pin)?.dispose()
    this.games.delete(pin)
  }

  get size(): number {
    return this.games.size
  }
}
