const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let tiles = 18;
let tileSize = canvas.width / tiles -2;
let gameOver = false
let score = 0
let gameSpeed = 200
const scoreSpan = document.getElementById("score")
const highScore = document.getElementById("highScore")
const startGameBtn = document.getElementById("start-game")
const arrowUp = document.getElementById("arrow-up")
const arrowDown = document.getElementById("arrow-down")
const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")

const restartGame = () => {
    highScore.innerHTML = score
    score = 0;
    scoreSpan.innerHTML = score
    snakeX = 10;
    snakeY = 10;
    foodX = Math.floor(Math.random() * tiles)
    foodY = Math.floor(Math.random() * tiles)
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
  if (score > 5) {
    drawBadFood()
  }

  if (score > 10) {
    gameSpeed = 150
  }

  if (score > 15) {
    gameSpeed = 100
  }

  drawFood()
  snakePos()
  drawSnake()
  collisions()
  setTimeout(game, gameSpeed)
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
  if (e.keyCode === 38 || e.currentTarget.id === "arrow-up") {
    if (snakeDy === 1 || snakeDy === -1) {
      return
    }
    snakeDx = 0
    snakeDy -= 1
  }
  if (e.keyCode === 40 || e.currentTarget.id === "arrow-down") {
    if (snakeDy === -1 || snakeDy === 1) {
      return
    }
    snakeDx = 0
    snakeDy += 1
  }
  if (e.keyCode === 39 || e.currentTarget.id === "arrow-left") {
    if (snakeDx === -1 || snakeDx === 1) {
      return
    }
    snakeDx += 1
    snakeDy = 0
  }
  if (e.keyCode === 37 || e.currentTarget.id === "arrow-right") {
    if (snakeDx === 1 || snakeDx === -1) {
      return
    }
    snakeDx -= 1
    snakeDy = 0
  }
}

document.addEventListener("keydown", snakeControls)
arrowUp.addEventListener("click", snakeControls)
arrowDown.addEventListener("click", snakeControls)
arrowLeft.addEventListener("click", snakeControls)
arrowRight.addEventListener("click", snakeControls)

let foodX = Math.floor(Math.random() * tiles)
let foodY = Math.floor(Math.random() * tiles)
const drawFood = () => {
  ctx.fillStyle = "red"
  ctx.fillRect(foodX * tiles,foodY * tiles, tileSize, tileSize)
}

let badFoodX = Math.floor(Math.random() * tiles);
let badFoodY = Math.floor(Math.random() * tiles);
const drawBadFood = () => {
  ctx.fillStyle = "blue"
  ctx.fillRect(badFoodX * tiles,badFoodY * tiles, tileSize, tileSize)
}

const collisions = () => {

  // food collisons
  if (snakeX === foodX && snakeY === foodY) {
    foodX = Math.floor(Math.random() * tiles)
    foodY = Math.floor(Math.random() * tiles)
    foodEaten++
    score++
    scoreSpan.innerHTML = score
  }
  if (score > 5) {
    if (snakeX === badFoodX && snakeY === badFoodY) {
      badFoodX = Math.floor(Math.random() * tiles)
      badFoodY = Math.floor(Math.random() * tiles)
      if (foodEaten > 2) {
        foodEaten--
        snakeBody.shift()
      }
      score--
      scoreSpan.innerHTML = score
    }
  }

  // body collisions
  // last x,y pos is last head pos, so only want to see if head collides with all but last two snake parts
  for (let i = snakeBody.length - 2; i > 0; i--) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
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