var canvas    // Get the canvas 
var vanvasContext  //Canvas context here is were we will be using to draw the shapes 
                    
var ballX = 50  // X position of ball 
var ballY = 50 //  Y position of ball 

var ballSpeedX = 5
var ballSpeedY = 5 

var paddleOneY = 250
var paddleTwoY = 250

const WINNING_SCORE = 10 
var playerWon = false

const PADDLE_THICKNESS = 10
const PADDLE_HEIGHT = 100;

var player1Score = 0 
var player2Score = 0

function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect() // get the Rectangular canvas
    var root = document.documentElement // Gets a handle on the document (Whole Canvas)
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top  - root.scrollTop
    
    return {
        x : mouseX,
        y : mouseY
    };
}

window.onload = function () {
        canvas = document.getElementById('gameCanvas')
        canvasContext =  canvas.getContext('2d') // canvasContext helps to manipulate the canvas
       
        var fps = 30
        setInterval(function() {
            moveEverything()
            drawEverything()
        }, 1000/fps)

        canvas.addEventListener('mousemove', function (evt) {
                                                var mousePos = calculateMousePosition(evt)
                                                paddleOneY = mousePos.y - (PADDLE_HEIGHT/2)
                                          //      paddleTwoY = mousePos.y - (PADDLE_HEIGHT/2)
                                        })
                                        
        canvas.addEventListener('mousedown', function (evt) {
                                                if(playerWon) {
                                                    player1Score = 0 
                                                    player2Score = 0
                                                    playerWon = false
                                                }
                                        })
}

// Function to make the right paddle automatically move up and down 
function computerMovement(){
    var paddleTwoYCenter = paddleTwoY + (PADDLE_HEIGHT/2)
   
    if(paddleTwoYCenter < ballY-35) {
        paddleTwoY += 5
    }

    else if (paddleTwoYCenter > ballY+35){
        paddleTwoY -= 5
    }
}

function moveEverything() {

    // if player won exit out this fn 
    if(playerWon){
        return
    }
    computerMovement()

    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballX >= canvas.width) {
     //    ballSpeedX = -ballSpeedX   
         if(ballY > paddleTwoY && ballY < paddleTwoY+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
            
            var deltaY = ballY - (paddleTwoY + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score += 1 // score must be before reset to check win cond
            ballReset()
            
        }    
    }

    else if (ballX <= 0) {
        if(ballY > paddleOneY && ballY < paddleOneY+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (paddleOneY + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player2Score += 1 // score must be before reset to check win cond
            ballReset()
            
        }
    }

     if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY
    }

    else if (ballY <= 0) {
        ballSpeedY = -ballSpeedY
    }
    
}

// Resets the ball if it get's out of boundary and resets the score
function ballReset() {
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
      //  alert(" Match is over !")
        // player1Score = 0
        // player2Score = 0
        playerWon = true
    }
    ballSpeedX = -ballSpeedX
    ballX = canvas.width/2 
    ballY = canvas.width/2 
}

// Function to draw net in the center of the canvas 
function drawNet() {
     for(var i = 0; i < canvas.height;i +=40) {
         colorRect(canvas.width/2-1,i,2,20,'white')
     }
}

function drawEverything() {
    // Canvas Background
    colorRect(0,0,canvas.width,canvas.height,'black')

    // if player won exit out this fn !
    if(playerWon){
        canvasContext.fillStyle = 'white'
        if(player1Score >= WINNING_SCORE ) {
            canvasContext.fillText("Game Over Player Won",350,200)
           
        }
        else if(player2Score >= WINNING_SCORE){
            canvasContext.fillText("BOT Won",350,200)
        }
        canvasContext.fillText("Click To Continue !",340,500)      
        return
    }

    drawNet()

    // Left Side Paddle 
    colorRect(0,paddleOneY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white') 

    //Right Side Paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddleTwoY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white')

    // Circle
    colorCircle(ballX,ballY,10,'white')

    // Score Readings 

    canvasContext.fillText("PLAYER : "+player1Score, 100, 100)
    canvasContext.fillText("BOT : "+player2Score, canvas.width-100, 100)

}

// fn to draw the rectangle 
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height) 
}

function colorCircle(x, y, radius, color) {
    // Drawing the ball 
    canvasContext.fillStyle = color
    canvasContext.beginPath()
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}

