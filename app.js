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
let food;
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
window.requestAnimationFrame(gameLoop);
spawnFood();
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
  context.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}
function update() {
  for (i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  if (
    snake[0].x < 0 ||
    snake[0].x > canvas.width / boxSize ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height / boxSize
  ) {
    reset();
    return;
  }

  switch (direction) {
    case "up":
      snake[0].y -= 1;
      break;
    case "down":
      snake[0].y += 1;
      break;
    case "right":
      snake[0].x += 1;
      break;
    case "left":
      snake[0].x -= 1;
      break;
  }
}

function spawnFood() {
  food = {
    x: Math.floor((Math.random() * canvas.width) / boxSize),
    y: Math.floor((Math.random() * canvas.height) / boxSize),
  };
}

function reset() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  direction = "right";
  spawnFood();
}

function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
  }
}

function gameLoop() {
  render();
  update();

  setTimeout(() => {
    window.requestAnimationFrame(gameLoop);
  }, 50);
}

document.addEventListener("keydown", handleInput);
