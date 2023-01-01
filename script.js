console.log("Snake is running...");
//initial value of input direction
let inputDir = { x: 0, y: 0 };
// all music
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");

// last paint time or last frame time it is work in fps  ,speed that controls the fps - frame per second
let lastPaintTime = 0;
let speed = 5;
let score = 0;

// initial snake and food position
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

//Game functions or method

//gameLoop is run by this function
function main(curTime) {
  //   console.log(curTime);
  window.requestAnimationFrame(main); // read about tihis below the page
  if ((curTime - lastPaintTime) / 1000 < 1 / speed) {
    return; // means reander when uper condition goes false
  }
  // makeing return true by elqule both times
  lastPaintTime = curTime;
  gameEngine();
}

// function for collision of snake
function isCollide(snakeArray) {
  //if you bump into yourself or in wall ....here i = 1 because sanke can collide with his next part not on i = 0
  for (let i = 1; i < snakeArray.length; i++) {
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[0].y //these means that when position of snakes parts and his head are same then are collide
    ) {
      return true;
    }
    if (
      snakeArray[i].x >= 18 ||
      snakeArray[i].x <= 0 || // these value means when position of last and first grid is same means snake and wall is collide
      snakeArray[i].y >= 18 ||
      snakeArray[i].y <= 0
    ) {
      return true;
    }
  }
}

//////////////////////////////////// main function where all work happens to snake and food move to moving snake parts with each others and collision
function gameEngine() {
  //part 1: updating the snake array and food
  if (isCollide(snakeArr)) {
    // console.log("snakeArr", snakeArr);

    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!, Press Any Key To Play Again :)");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if you have eaten the food , increment the score and regenerate the food at new location
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // when food and snake head position are same
    score += 1;
    if (score > hScoreVal) {
      hScoreVal = score;
      localStorage.setItem("highscore", JSON.stringify(hScoreVal));
      highScoreBox.innerHTML = "Hi-Score: " + hScoreVal;
    }
    scoreBox.innerHTML = "Your Score: " + score;
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x, // adding a new grid block in snake head
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16; //here a and b are grid R & C
    food = {
      x: Math.round(a + (b - a) * Math.random()), // giving food a random position
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake parts with each others
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
    console.log({ ...snakeArr[i] });
  }
  // following the privous part mean last array is following the previous array of the last array
  // puting all the value of snakeArr[i+1] in obj ...snakeArr[i]   means grid block ahead of the last block
  //head 1 2 3 5 6 .. second last     last  ... here last is following second last and second last
  //is following third last or taking there position
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y; // head part is moving with Arrow input direction

  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div"); // adding snake in Dom
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x; // giving initial position

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display the food
  foodElement = document.createElement("div"); // adding food in DOm or board
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x; // positioning
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Logic starts here
musicSound.play();
window.requestAnimationFrame(main);

/*If you're familiar with JavaScript, you might think of setTimeout() or setInterval() - 
functions that allow executing code after a given amount of time. This is a pretty reasonable idea,
 but in browsers there's a better way: requestAnimationFrame(). It's a fairly new function with strong browser support.
You pass a callback to this function, and it runs that callback the next time the browser is ready to change how the page looks.
 On a 60 Hz monitor, that means an optimally tuned application can draw updates (called painting frames) 60 times per second.So, 
 your main loop has 1 / 60 = 16.667 milliseconds to do its thing every time it runs if you want to hit that 60 frames-per-second ideal.
 We'll cover a polyfill for node.js/io.js and lesser browsers later on.

Keep in mind that most monitors can't display more than 60 frames per second (FPS). 
Whether humans can tell the difference among high frame rates depends on the application, 
but for reference, film is usually displayed at 24 FPS, other videos at 30 FPS, most games are acceptable above 30 FPS,
and virtual reality might require 75 FPS to feel natural. Some gaming monitors go up to 144 FPS. */

//puting a event on keyboard Arrow
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // or snake valocity ...game starts form here
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      //   console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1; // adding or subtracting acording to snake position in x and y direction ..rember that x and y are not same as 10th class graph in JS
      break;
    case "ArrowDowm":
      //   console.log("ArrowDowm");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      //   console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      // console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});

//local storage for HighScore
let highScore = localStorage.getItem("highscore");

if (highScore === null) {
  hScoreVal = 0;
  localStorage.setItem("highscore", JSON.stringify(hScoreVal));
} else {
  hScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "HiScore: " + hScoreVal;
}
