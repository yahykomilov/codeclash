import "dotenv/config"
import { createServer } from "http"
import cors from "cors"
import express from "express"
import { Server } from "socket.io"
import { registerHandlers } from "./registerHandlers"

const PORT = Number(process.env.PORT) || 3001
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173"

const app = express()
app.use(cors({ origin: ORIGIN }))
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "codeclash-server" })
})

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: ORIGIN, methods: ["GET", "POST"] },
})

registerHandlers(io)

httpServer.listen(PORT, () => {
  console.log(`⚔️  CodeClash server listening on http://localhost:${PORT}`)
  console.log(`   client origin allowed: ${ORIGIN}`)
})
