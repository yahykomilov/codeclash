import "dotenv/config"
import { createServer } from "http"
import cors from "cors"
import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import { Server } from "socket.io"
import { registerHandlers } from "./registerHandlers"

const PORT = Number(process.env.PORT) || 3001
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173"

const app = express()
app.disable("x-powered-by")
app.use(helmet())
app.use(cors({ origin: ORIGIN }))
app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }))

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "codeclash-server" })
})

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: ORIGIN, methods: ["GET", "POST"] },
  // Hardening: payloads here are tiny; cap them and bound connect time.
  maxHttpBufferSize: 8 * 1024,
  connectTimeout: 10_000,
  pingTimeout: 20_000,
  // Survive brief network blips (wifi drop, tab sleep): restore rooms + missed
  // events without losing the player's score — counter to Kahoot's "disconnect = out".
  connectionStateRecovery: { maxDisconnectionDuration: 60_000, skipMiddlewares: true },
})

registerHandlers(io)

httpServer.listen(PORT, () => {
  console.log(`⚔️  CodeClash server listening on http://localhost:${PORT}`)
  console.log(`   client origin allowed: ${ORIGIN}`)
})
