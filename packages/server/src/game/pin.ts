import { randomInt } from "node:crypto"

/** Generate a unique, cryptographically-random 6-digit room PIN. */
export function generatePin(exists: (pin: string) => boolean): string {
  let pin: string
  do {
    pin = String(randomInt(100000, 1000000))
  } while (exists(pin))
  return pin
}
