/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#8b5cff", dark: "#6d3bff", light: "#b8a5ff" },
        neon: {
          violet: "#8b5cff",
          cyan: "#22d3ee",
          magenta: "#ff3d9a",
          lime: "#b6f36a",
        },
        answer: {
          red: "#ff4365",
          blue: "#2f6bff",
          yellow: "#ffb020",
          green: "#3ddc84",
        },
      },
      fontFamily: {
        display: ["Chakra Petch", "sans-serif"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rise: {
          "0%": { transform: "translateY(18px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.25s ease-out both",
        rise: "rise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        floaty: "floaty 4.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
