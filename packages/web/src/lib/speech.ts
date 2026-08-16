/**
 * Read text aloud via the browser's SpeechSynthesis API (free, offline).
 * Accessibility counter to Kahoot: helps low-vision players and back-of-room readers.
 */
export function speak(text: string, locale: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-US"
  u.rate = 1
  window.speechSynthesis.speak(u)
}

export const speechSupported =
  typeof window !== "undefined" && "speechSynthesis" in window
