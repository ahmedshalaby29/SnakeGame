const gameBoard = document.getElementById("game-board");
const snakeElement = document.getElementById("snake");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("best-score");

const startingTextButton = document.getElementById("starting-text");
const gridSize = 20;
let snakePositions;
let snakeHead = { x: 10, y: 10 };
let gameStarted = false;
let food;
let direction = "right";
let directionInput = "right";
let gameSpeed = 200;
let score = 0;
let bestScore = 0;

function render() {
  if (!gameStarted) return;

  //reset game board each frame
  gameBoard.innerHTML = "";
  //render segment elements
  snakePositions.forEach((segmentPos, i) => {
    const segment = document.createElement("div");
    gameBoard.appendChild(segment);
    segment.className = "snake";
    segment.style.gridColumn = segmentPos.x + 1;
    segment.style.gridRow = segmentPos.y + 1;
    // if (i === 0) segment.style.backgroundColor = "red";
  });

  //render food element
  const foodElement = document.createElement("div");
  foodElement.className = "food";
  gameBoard.appendChild(foodElement);
  foodElement.style.gridColumn = food.x + 1;
  foodElement.style.gridRow = food.y + 1;
  scoreElement.innerHTML = String(score).padStart(3, "0");
}

function update() {
  if (!gameStarted) return;
  //handle movement
  if (directionInput === "up" && direction !== "down") {
    direction = directionInput;
  } else if (directionInput === "down" && direction !== "up") {
    direction = directionInput;
  } else if (directionInput === "left" && direction !== "right") {
    direction = directionInput;
  } else if (directionInput === "right" && direction !== "left") {
    direction = directionInput;
  }
  switch (direction) {
    case "up":
      snakeHead.y -= 1;
      break;
    case "down":
      snakeHead.y += 1;

      break;
    case "left":
      snakeHead.x -= 1;

      break;
    case "right":
      snakeHead.x += 1;
      break;
  }
  if (!checkCollision()) {
    for (i = snakePositions.length - 1; i > 0; i--) {
      snakePositions[i] = { ...snakePositions[i - 1] };
    }
    snakePositions[0].x = snakeHead.x;
    snakePositions[0].y = snakeHead.y;
  }
  render();
}

function checkCollision() {
  //check collision with walls

  if (
    snakeHead.x > gridSize - 1 ||
    snakeHead.x < 0 ||
    snakeHead.y > gridSize - 1 ||
    snakeHead.y < 0
  ) {
    playerLost();
    return true;
  }

  //check collision with yourself

  for (i = 1; i < snakePositions.length - 1; i++) {
    if (
      snakeHead.x === snakePositions[i].x &&
      snakeHead.y === snakePositions[i].y
    ) {
      playerLost();
      return true;
    }
  }

  //check collision with food
  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    snakePositions.unshift({ ...food });

    spawnFood();
    updateScore();
    return true;
  }
  return false;
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

function playerLost() {
  gameStarted = false;
  gameBoard.innerHTML = "";
  startingTextButton.style.display = "block";
  scoreElement.textContent = 0;
  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.innerHTML = String(bestScore).padStart(3, "0");
    bestScoreElement.style.display = "block";
  }
}

function startGame() {
  snakePositions = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  snakeHead = { x: 10, y: 10 };
  direction = "right";
  directionInput = "right";
  score = 0;
  gameSpeed = 200;
  startingTextButton.style.display = "none";
  spawnFood();
  gameStarted = true;
}
function updateScore() {
  score += 10;
  gameSpeed -= 10;
}

startingTextButton.addEventListener("click", startGame);
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      directionInput = "up";
      break;
    case "ArrowDown":
      directionInput = "down";

      break;
    case "ArrowLeft":
      directionInput = "left";

      break;
    case "ArrowRight":
      directionInput = "right";
      break;
    case " ":
      startGame();
      break;
  }
});

setInterval(update, gameSpeed);
