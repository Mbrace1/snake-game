const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let tiles = 20;
let tileSize = canvas.width / tiles -2;
let gameOver = false
let score = 0
const scoreSpan = document.getElementById("score")
const highScore = document.getElementById("highScore")
const startGameBtn = document.getElementById("start-game")

const restartGame = () => {
    highScore.innerHTML = score
    score = 0;
    scoreSpan.innerHTML = score
    snakeX = 10;
    snakeY = 10;
    foodX = 5;
    foodY = 5;
    snakeDx = 0;
    snakeDy = 0;
    snakeBody = [];
    foodEaten = 2;
    gameOver = false
    game()
}

startGameBtn.addEventListener("click", restartGame)

const game = () => {
  if (gameOver) {
    startGameBtn.classList.remove("hide-btn")
  } else {
    startGameBtn.classList.add("hide-btn")
  }

  if (gameOver) {
    // stop refreshing screen
    return
  }

  resetCanvas()
  drawFood()
  snakePos()
  drawSnake()
  collisions()
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
let snakeBody = [];
let foodEaten = 2;


const drawSnake = () => {

  // body
  // snake part added every screen refresh where the head was at last
  let snakePart = {
    x: snakeX,
    y: snakeY
  }
  snakeBody.push(snakePart)

  // remove snake parts as it should always be equal to amount of food eaten
  if (snakeBody.length > foodEaten) {
    snakeBody.shift()
  }

  ctx.fillStyle = "green"
  // draw all snake body parts in array
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i].x * tiles,snakeBody[i].y * tiles, tileSize, tileSize)
  }

  // draw head last
  ctx.fillStyle = "#00ff00"
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

  // food collisons
  if (snakeX === foodX && snakeY === foodY) {
    foodX = Math.floor(Math.random() * tiles)
    foodY = Math.floor(Math.random() * tiles)
    foodEaten++
    score++
    scoreSpan.innerHTML = score
    // console.log(snakeBody)
  }

  // body collisions
  // last x,y pos is last head pos, so only want to see if head collides with all but last two snake parts
  for (let i = snakeBody.length - 2; i > 0; i--) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      console.log("hit body")
      console.log(snakeBody)
      gameOver = true
      break
    }
  }

  // wall collisions
  if (snakeX === tiles || snakeX < 0) {
    gameOver = true
  }

  if (snakeY === tiles || snakeY < 0) {
    gameOver = true
  }

  if (gameOver) {
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = "red"
    ctx.fillText('GAME OVER!', canvas.width/2, canvas.height -100);
  }
}

game()

// add a bad apple? blue == fast orange == take away score etc