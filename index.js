const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let tiles = 20;
let tileSize = canvas.width / tiles -2;

const game = () => {
  resetCanvas()
  collisions()
  drawFood()
  snakePos()
  drawSnake()
  console.log(100)
  setTimeout(game, 200)
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
  ctx.fillRect(snakeX * tiles,snakeY * tiles, tileSize, tileSize)
}

const snakePos = () => {
  snakeX = snakeX + snakeDx
  snakeY = snakeY + snakeDy
}

const snakeControls = (e) => {
  if (e.keyCode === 38) {
    if (snakeDy === 1 || snakeDy === -1) {
      return
    }
    snakeDx = 0
    snakeDy -= 1
  }
  if (e.keyCode === 40) {
    if (snakeDy === -1 || snakeDy === 1) {
      return
    }
    snakeDx = 0
    snakeDy += 1
  }
  if (e.keyCode === 39) {
    if (snakeDx === -1 || snakeDx === 1) {
      return
    }
    snakeDx += 1
    snakeDy = 0
  }
  if (e.keyCode === 37) {
    if (snakeDx === 1 || snakeDx === -1) {
      return
    }
    snakeDx -= 1
    snakeDy = 0
  }
}

document.addEventListener("keydown", snakeControls)

let foodX = 5;
let foodY = 5;
const drawFood = () => {
  ctx.fillStyle = "red"
  ctx.fillRect(foodX * tiles,foodY * tiles, tileSize, tileSize)
}

const collisions = () => {
  if (snakeX === foodX && snakeY === foodY) {
    foodX = Math.floor(Math.random() * tiles)
    foodY = Math.floor(Math.random() * tiles)
  }
}

game()