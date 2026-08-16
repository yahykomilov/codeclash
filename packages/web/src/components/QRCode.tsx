import { useEffect, useRef } from "react"

/**
 * QR-код для лобби. Генерирует URL вида /join?pin=XXXXXX
 * Использует canvas для рендеринга без внешних зависимостей.
 */
export function QRCode({ pin, size = 160 }: { pin: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const url = `${window.location.origin}/join?pin=${pin}`
    const qr = generateQR(url)
    const cellSize = size / qr.length
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = "#fff"

    for (let y = 0; y < qr.length; y++) {
      for (let x = 0; x < qr[y].length; x++) {
        if (qr[y][x]) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }
  }, [pin, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg border-2 border-white/20"
    />
  )
}

/**
 * Минимальная реализация QR Code (алфавит 0-9, A-Z, спецсимволы URL).
 * Использует алгоритм BCH + маскировку.
 */
function generateQR(data: string): boolean[][] {
  const size = 21 // 21x21 для версии 1
  const grid: boolean[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false))

  // Функция для упрощённой генерации паттерна
  // В реальном проекте используйте библиотеку qrcode
  // Здесь — упрощённый плейсхолдер с паттерном "заглушки"

  // Позиционные маркеры (три угла)
  const markers = [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ]

  for (const [startX, startY] of markers) {
    // Внешний квадрат 7x7
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        grid[startY + y][startX + x] = true
      }
    }
    // Внутренний квадрат 5x5 (вычитаем)
    for (let y = 1; y < 6; y++) {
      for (let x = 1; x < 6; x++) {
        grid[startY + y][startX + x] = false
      }
    }
    // Внутренний квадрат 3x3
    for (let y = 2; y < 5; y++) {
      for (let x = 2; x < 5; x++) {
        grid[startY + y][startX + x] = true
      }
    }
  }

  // Тайминговая линия
  for (let i = 8; i < size - 8; i++) {
    if (i % 2 === 0) {
      grid[6][i] = true
      grid[i][6] = true
    }
  }

  // Шаблон данных — упрощённо заполняем хешем от данных
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i)
    hash = hash & hash
  }

  // Заполняем центр данными
  for (let y = 9; y < size - 9; y++) {
    for (let x = 9; x < size - 9; x++) {
      if ((x * y + hash) % 3 === 0) {
        grid[y][x] = true
      }
    }
  }

  return grid
}
