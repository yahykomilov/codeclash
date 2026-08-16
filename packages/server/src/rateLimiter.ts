interface Bucket {
  tokens: number
  last: number
}

/**
 * Token-bucket rate limiter keyed by socket id or IP.
 * `capacity` = burst size, `refillPerSec` = sustained rate.
 * Used to stop PIN brute-force, game-creation floods, and answer spam.
 */
export class RateLimiter {
  private readonly buckets = new Map<string, Bucket>()

  constructor(
    private readonly capacity: number,
    private readonly refillPerSec: number,
  ) {}

  allow(key: string): boolean {
    const now = Date.now()
    let b = this.buckets.get(key)
    if (!b) {
      b = { tokens: this.capacity, last: now }
      this.buckets.set(key, b)
    }
    const elapsed = (now - b.last) / 1000
    b.tokens = Math.min(this.capacity, b.tokens + elapsed * this.refillPerSec)
    b.last = now
    if (b.tokens < 1) return false
    b.tokens -= 1
    return true
  }

  /** Drop a key's state (e.g. on disconnect) to bound memory. */
  forget(key: string): void {
    this.buckets.delete(key)
  }
}
