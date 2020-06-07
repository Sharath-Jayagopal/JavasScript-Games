/*
        Snake Game !
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit 
const box = 32;

// Load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Audio files
const dead = new Audio()
dead.src = 'audio/dead.mp3'

const down = new Audio()
down.src = 'audio/down.mp3'

const eat = new Audio()
eat.src = 'audio/eat.mp3'

const left = new Audio()
left.src = 'audio/left.mp3'

const right = new Audio()
right.src = 'audio/right.mp3'

const up = new Audio()
up.src = 'audio/up.mp3'

// snake 
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// food
let food = {
    x : Math.floor(Math.random()* 17+1) * box,
    y : Math.floor(Math.random()* 15+3) * box
}

let score = 0; 

let d;
//Control the snake
document.addEventListener("keydown", function(e) {
                    if(e.keyCode==37 && d!== 'RIGHT') {
                        left.play()
                        d = 'LEFT'
                    }
                    else if(e.keyCode==38 && d!== 'DOWN') {
                        up.play()
                        d = 'UP'
                    }
                    else if(e.keyCode==39 && d!== 'LEFT') {
                        right.play()
                        d = 'RIGHT'                   
                    }
                    else if(e.keyCode==40 && d!== 'UP') {
                        down.play()
                        d = 'DOWN'                       
                    }
        })

// draw 
function draw() {
    ctx.drawImage(ground,0,0)

    for(let i = 0;i < snake.length; i++){
        ctx.fillStyle =(i == 0) ? "green" : "white"
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y)

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direction condition 
    if(d =='LEFT') {
        snakeX -= box
    } 
    if(d =='RIGHT') {
        snakeX += box
    }
    if(d =='UP') {
        snakeY -= box
    }
    if(d =='DOWN') {
        snakeY += box
    }

    /*
          Collision Check !

          Here we're checking to see if the head of the snake hits its own cell's or not 
          we will return true if correct and false if not 
    */
    function collision(head,array) 
    {
        for(let i = 0; i < array.length ; i++) {
            if(head.x == array[i].x && head.y == array[i].y) {
                return true
            }
        }
        return false
    }

    // Increment size of snake if it eats the food 
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play()
        food = {
            x : Math.floor(Math.random()* 17+1) * box,
            y : Math.floor(Math.random()* 15+3) * box
        }
    }
    else{
        //remove the tail 
        snake.pop()

    }

    // New Head 
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))  {
        dead.play()
        clearInterval(game)
    }

    snake.unshift(newHead)

    ctx.fillStyle = "white"
    ctx.font = "45px Changa one"
    ctx.fillText(score, 2*box, 1.6*box);
}
let game = setInterval(draw,100);
