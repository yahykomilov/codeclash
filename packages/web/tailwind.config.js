/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7c3aed",
          dark: "#5b21b6",
          light: "#a78bfa",
          darker: "#311b92",
        },
        answer: {
          red: "#e21b3c",
          blue: "#1368ce",
          yellow: "#d89e00",
          green: "#26890c",
        },
        neon: {
          purple: "#a855f7",
          cyan: "#06b6d4",
          pink: "#ec4899",
          green: "#22c55e",
        },
      },
      fontFamily: {
        display: ["Chakra Petch", "system-ui", "sans-serif"],
        body: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px var(--tw-colors-brand-light), 0 0 40px var(--tw-colors-brand)",
          },
          "50%": {
            boxShadow:
              "0 0 30px var(--tw-colors-brand-light), 0 0 60px var(--tw-colors-brand), 0 0 80px var(--tw-colors-brand-dark)",
          },
        },
        "aurora-drift": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "25%": { transform: "translate(-30%, -40%) scale(1.05)" },
          "50%": { transform: "translate(-60%, -30%) scale(0.95)" },
          "75%": { transform: "translate(-40%, -60%) scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        glitch: {
          "0%": { textShadow: "0 0 0px, 0 0 0px, 0 0 0px" },
          "20%": { textShadow: "2px 0 0 #ff00c8, -2px 0 0 #00ffff" },
          "40%": { textShadow: "-2px 0 0 #ff00c8, 2px 0 0 #00ffff" },
          "60%": { textShadow: "2px 0 0 #ff00c8, -2px 0 0 #00ffff" },
          "80%": { textShadow: "-2px 0 0 #ff00c8, 2px 0 0 #00ffff" },
          "100%": { textShadow: "0 0 0px, 0 0 0px, 0 0 0px" },
        },
        "stagger-fade": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "timer-sweep": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        "answer-pop": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 58%, 60%, 62%, 64%, 66%, 68%, 70%, 72%, 74%, 76%, 78%, 80%, 82%, 84%, 86%, 88%, 90%, 92%, 94%, 96%, 98%, 100%": {
            opacity: "1",
          },
          "20%, 22%, 24%, 55%, 57%, 59%, 61%, 63%, 65%, 67%, 69%, 71%, 73%, 75%, 77%, 79%, 81%, 83%, 85%, 87%, 89%, 91%, 93%, 95%, 97%, 99%": {
            opacity: "0.4",
          },
        },
      },
      animation: {
        "pop-in": "pop-in 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "aurora-drift": "aurora-drift 20s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glitch: "glitch 3s infinite",
        "stagger-fade": "stagger-fade 0.6s ease-out both",
        "timer-sweep": "timer-sweep 1s linear infinite",
        "answer-pop": "answer-pop 0.3s ease-out",
        "confetti-fall": "confetti-fall 3s linear infinite",
        "neon-flicker": "neon-flicker 2s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        neon: "0 0 20px theme(colors.brand.light), 0 0 40px theme(colors.brand.DEFAULT)",
        "neon-strong":
          "0 0 30px theme(colors.brand.light), 0 0 60px theme(colors.brand.DEFAULT), 0 0 80px theme(colors.brand.dark)",
        "neon-card":
          "0 0 30px rgba(124, 54, 234, 0.3), inset 0 0 20px rgba(124, 54, 234, 0.1)",
      },
    },
  },
  plugins: [],
}
