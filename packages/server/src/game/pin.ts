/** Generate a unique 6-digit room PIN. */
export function generatePin(exists: (pin: string) => boolean): string {
  let pin: string
  do {
    pin = String(Math.floor(100000 + Math.random() * 900000))
  } while (exists(pin))
  return pin
}
