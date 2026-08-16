import { io, type Socket } from "socket.io-client"

const URL = (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:3001"

let socket: Socket | null = null

export function getSocket(): Socket {
  if (!socket) {
    socket = io(URL, { transports: ["websocket"], autoConnect: true })
  }
  return socket
}

export function resetSocket(): void {
  socket?.removeAllListeners()
}
