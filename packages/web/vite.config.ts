import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@codeclash/common": path.resolve(__dirname, "../common/src"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
  },
})
