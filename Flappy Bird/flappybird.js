/*
       Flappy Bird clone !
    */
const cvs = document.getElementById('bird')
const ctx = cvs.getContext('2d')

// vars and consts 
let frames = 0;
const DEGREE = Math.PI/180

// Load Sprite Image
const sprite = new  Image()
sprite.src = "img/sprite.png"

// Audio 
const SCORE_S = new Audio()
SCORE_S.src = 'audio/sfx_point.wav'

const FLAP = new Audio()
FLAP.src = 'audio/sfx_flap.wav'

const HIT = new Audio()
HIT.src = 'audio/sfx_hit.wav'

const SWOOSHING = new Audio()
SWOOSHING.src = 'audio/sfx_swooshing.wav'

const DIE = new Audio()
DIE.src = 'audio/sfx_die.wav'

// Game State eg : Ready, ingame ,GameOver
const state = {
    current : 0,
    getReady:0,
    game : 1,
    over : 2
}

// Start Button 
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

// Control flow of Game 
cvs.addEventListener("click", function(evt) {
    switch(state.current){
        case state.getReady :
             state.current = state.game;
             SWOOSHING.play()
             break;
        case state.game:
             bird.flap();
             FLAP.play();
             break;
        case state.over:
             let rect = cvs.getBoundingClientRect()
             let clickX = evt.clientX - rect.left;
             let clickY = evt.clientY - rect.top;

             // Checking to see if we click on the start button and not anywhere in the canvas 
             if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y
                + startBtn.h){
                    pipes.reset()
                    bird.speedReset()
                    score.reset()
                    state.current = state.getReady;
                }
             break;
    }
});

// Background 
const bg = {
    sX : 0,
    sY : 0, 
    w  : 275,
    h  : 226,
    x  : 0,
    y  : cvs.height - 226,

    draw : function () {
        ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h,this.x, this.y, 
            this.w, this.h)

        ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h,this.x + this.w , this.y, 
            this.w, this.h)
    
    }
}

// foreground
const fg = {
    sX : 276,
    sY : 0, 
    w  : 224,
    h  : 112,
    x  : 0,
    y  : cvs.height - 112,
    dx : 2,

    draw : function () {
        ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h,this.x, this.y, 
            this.w, this.h)

        ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h, this.x + this.w , this.y, 
            this.w, this.h)    
    },

    update : function () {
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2)
        }
     }    
}

// Bird 
const bird = {
    animation : [
        {sX: 276, sY : 112},
        {sX: 276, sY : 139},
        {sX: 276, sY : 164},
        {sX: 276, sY : 139},
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,

    radius : 12,

    frame : 0,

    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,

    draw : function() {
        let bird = this.animation[this.frame]

        // ctx.save() // save the context before rotation
        // ctx.translate(this.x, this.y)
        // ctx.rotate(this.rotation)
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite ,bird.sX, bird.sY, this.w, this.h,  - this.w/2 , - this.h/2, 
            this.w, this.h)
        ctx.restore() // Restoring the rotated canvas back to original state
    },

    flap : function() {
        this.speed = -this.jump 
    },

    update : function() {
        // If the game state is equal to getReady then period 10 else 5 
             this.period = state.current == state.getReady ? 10 : 5;

        /*
             Increment Frames (for animating the bird) 
             i.e we add 1 frame each, if frames % (period = 5 inGame)
        */ 
             this.frame += frames%this.period == 0 ? 1 : 0

        /*
           we have only 4 bird animations so max frames is 4 
           so when frames reach 4 we have to reverse it back to 0 
        */

             this.frame = this.frame % this.animation.length; 

             if(state.current == state.getReady){
                this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
                this.rotation = 0 * DEGREE;
             }
             else {
                this.speed += this.gravity;
                this.y += this.speed;            

                // if the bird hit the floor make it stop there (Not to fall endlessly)
                if(this.y + this.h/2 >= cvs.height - fg.h){
                    this.y = cvs.height - fg.h - this.h/2;
                    if(state.current == state.game){
                        state.current = state.over;
                        DIE.play()
                    }
                }
                // If the speed is greater than the jump means the bird is falling down 
                if(this.speed >= this.jump){
                    this.rotation = 90 * DEGREE;
                    this.frame = 1;
                }else{
                    this.rotation = -25 * DEGREE;
                }

                // if the bird hits the top stop it there (Not to breach the boundary)
                // else if (this.y - this.h/2 <= 0) {
                //     this.y = this.h/2
                // }
        }
    },
    speedReset : function() {
        this.speed = 0
       }
}

// Get Ready Message 
const getReady = {
    sX: 0, 
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,
    
    draw : function() {
        if(state.current == state.getReady){
            ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h, this.x, this.y, 
                this.w, this.h)
        }           
    }

}

// Game over Message 
const gameOver = {
    sX: 175, 
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,

    draw : function() {
        if(state.current == state.over) {
            ctx.drawImage(sprite ,this.sX, this.sY, this.w, this.h, this.x, this.y, 
                this.w, this.h)
        }           
    }

}

// Pipes 
const pipes = {
    position : [],

    top : {
        sX : 553,
        sY : 0,
    },
    bottom : {
        sX : 502,
        sY : 0,
    },
    w : 53,
    h : 400,
    gap : 85,
    maxYpos : -150,
    dx : 2,

    draw : function () {
        for(let i = 0; i < this.position.length; i++)
        {
            let p = this.position[i];

            let topYpos = p.y;
            let bottomYpos = p.y + this.h + this.gap;
            // top pipe
            ctx.drawImage(sprite ,this.top.sX, this.top.sY, this.w, this.h, p.x, topYpos, 
                this.w, this.h)

            // bottom pipe
            ctx.drawImage(sprite ,this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYpos, 
                this.w, this.h)
        }
    },

    update: function (){
        if(state.current !== state.game){
            return
        }
                
        if(frames%100 == 0) {
            this.position.push({
                x : cvs.width,
                y : this.maxYpos * (Math.random() + 1)
            });    
        }
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            // To move the pipes to left 
            p.x  -= this.dx;
            let bottomPipeYpos = this.y + this.h + this.gap;

            // collison Detection 
            /*
               Here we checke if bird right side hit the pipes left side or left side of the bird hits the 
               right side of the pipe or bottom side of the bird less than top side of pipe or if top side of bird hit the 
               bottom part of pipe (Top pipe) 

               The above check condition is done for the bottom pipe also only change is p.y is change to bottomPipeYpos
            */
            if((bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y 
                && bird.y - bird.radius < p.y + this.h) || //bottom Pipe
                    (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYpos 
                        && bird.y - bird.radius < bottomPipeYpos + this.h)){
                            state.current = state.over;
                            HIT.play();
                        }                  
            
            // if the pipes goes beyond the canvas we must delete the pair of pipes from the array
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                SCORE_S.play()
                score.best = Math.max(score.value,score.best);
                localStorage.setItem("best",score.best);
            }
        }
    },

    reset : function() {
        this.position = []
    }
}

// Score 
const score = {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,

    draw : function() {
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000'
        if(state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value,cvs.width/2, 50)
            ctx.strokeText(this.value, cvs.width/2, 50)

        }else if (state.current == state.over) {
            // score value
            ctx.font = "25px Teko";
            ctx.fillText(this.value,225, 186)
            ctx.strokeText(this.value, 225, 186)
            // Best score
            ctx.fillText(this.best,225, 228)
            ctx.strokeText(this.best, 225, 228)
        }
    },

    reset : function reset() {
        this.value = 0
       }

}

//draw canvas
function draw() {
    ctx.fillStyle = '#70c5ce'; // Sky Blue Background
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw()
    pipes.draw()
    fg.draw()
    bird.draw()
    getReady.draw()
    gameOver.draw()    
    score.draw()
}

// Update 
function update(){
    bird.update();
    fg.update();
    pipes.update();
}

//Loop
function loop() {
    update()
    draw()
    frames++

    requestAnimationFrame(loop)
}
loop()