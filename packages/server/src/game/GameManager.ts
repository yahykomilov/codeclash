import type { Server } from "socket.io"
import type { Locale, Question } from "@codeclash/common"
import { Game } from "./Game"
import { generatePin } from "./pin"

/** Registry of all live games, keyed by PIN. */
export class GameManager {
  private readonly games = new Map<string, Game>()

  create(io: Server, hostId: string, questions: Question[], locale: Locale): Game {
    const pin = generatePin((p) => this.games.has(p))
    const game = new Game(io, pin, hostId, questions, locale)
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
