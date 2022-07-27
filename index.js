const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const game = () => {
  resetCanvas()
  snakePos()
  drawSnake()
  setTimeout(game, 10)
}

const resetCanvas = () => {
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,canvas.width, canvas.height)
}

let snakeX = 10;
let snakeY = 10;
let snakeDx = 0;
let snakeDy = 0;

const drawSnake = () => {
  ctx.fillStyle = "green"
  ctx.fillRect(snakeX,snakeY,20, 20)
}

const snakePos = () => {
  snakeX = snakeX + snakeDx
  snakeY = snakeY + snakeDy
}

const snakeControls = (e) => {
  if (e.keyCode === 38) {
    if (snakeDy === 1) {
      return
    }
    snakeDx = 0
    snakeDy -= 1
  }
  if (e.keyCode === 40) {
    if (snakeDy === -1) {
      return
    }
    snakeDx = 0
    snakeDy += 1
  }
  if (e.keyCode === 39) {
    if (snakeDx === -1) {
      return
    }
    snakeDx += 1
    snakeDy = 0
  }
  if (e.keyCode === 37) {
    if (snakeDx === 1) {
      return
    }
    snakeDx -= 1
    snakeDy = 0
  }
}

document.addEventListener("keydown", snakeControls)

game()