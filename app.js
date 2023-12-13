const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const boxSize = 30;
let direction = "right";
let lastInput = "right";

let food = [];
let score = 0;
let snakeHead = { ...snake[0] };
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

function startGame() {
  spawnFood(3);
  window.requestAnimationFrame(gameLoop);
}

function render() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "#32CD32";
  snake.forEach((segment) => {
    context.fillRect(
      segment.x * boxSize,
      segment.y * boxSize,
      boxSize,
      boxSize
    );
  });
  context.fillStyle = "#ff0000";
  food.forEach((point) => {
    context.fillRect(point.x * boxSize, point.y * boxSize, boxSize, boxSize);
  });
  context.fillStyle = "#ffffff";
  context.font = "30px Arial";
  context.fillText(score.toString().padStart(3, "0"), 30, 50);
}
function update() {
  switch (lastInput) {
    case "up":
      if (direction !== "down") direction = "up";
      break;
    case "down":
      if (direction !== "up") direction = "down";
      break;
    case "right":
      if (direction !== "left") direction = "right";
      break;
    case "left":
      if (direction !== "right") direction = "left";
      break;
  }
  switch (direction) {
    case "up":
      snakeHead.y -= 1;
      break;
    case "down":
      snakeHead.y += 1;
      break;
    case "right":
      snakeHead.x += 1;
      break;
    case "left":
      snakeHead.x -= 1;
      break;
  }
  //collision with walls
  if (
    snakeHead.x < 0 ||
    snakeHead.x > canvas.width / boxSize ||
    snakeHead.y < 0 ||
    snakeHead.y > canvas.height / boxSize
  ) {
    reset();
    return;
  }
  //self collision
  for (i = 1; i < snake.length - 1; i++) {
    if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {
      reset();
      return;
    }
  }

  //check collision with food
  food.forEach((point, i) => {
    if (snakeHead.x === point.x && snakeHead.y === point.y) {
      snake.push({ ...point });
      food.splice(i, 1);
      spawnFood(1);
      score += 10;
    } else {
      snake.some((segment) => {
        if ((segment.x === point.x) & (segment.y === point.y)) {
          snake.push({ ...point });
          food.splice(i, 1);

          spawnFood(1);
          score += 10;
        }
      });
    }
  });

  for (i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }
  snake[0] = { ...snakeHead };
}

function spawnFood(count) {
  for (let i = 0; i < count; i++) {
    food.push({
      x: Math.floor((Math.random() * canvas.width) / boxSize),
      y: Math.floor((Math.random() * canvas.height) / boxSize),
    });
  }
}

function reset() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  snakeHead = { ...snake[0] };

  direction = "right";
  score = 0;
  food = [];
  spawnFood(3);
}

function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
      lastInput = "up";
      break;
    case "ArrowDown":
      lastInput = "down";
      break;
    case "ArrowRight":
      lastInput = "right";
      break;
    case "ArrowLeft":
      lastInput = "left";
      break;
  }
}

function gameLoop() {
  update();
  render();

  setTimeout(() => {
    window.requestAnimationFrame(gameLoop);
  }, 100);
}
document.addEventListener("keydown", handleInput);
startGame();
