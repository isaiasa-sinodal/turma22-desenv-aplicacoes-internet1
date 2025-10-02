const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.25;
const JUMP_POWER = -4.6;
const PIPE_SPEED = 2;
const PIPE_GAP = 90;
const PIPE_WIDTH = 52;
const PIPE_SPAWN_RATE = 90;

let frames = 0;
let score = 0;
let gameState = 'ready';

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 34,
    height: 24,
    dy: 0 
};


let pipes = [];

const images = {};
images.bird = new Image();
images.bird.src = 'images/bird.png';

images.bg = new Image();
images.bg.src = 'images/background.png';

images.pipeTop = new Image();
images.pipeTop.src = 'images/pipe_top.png';

images.pipeBottom = new Image();
images.pipeBottom.src = 'images/pipe_bottom.png';


let assetsLoaded = 0;
const totalAssets = 4;
function assetLoaded() {
    assetsLoaded++;
    if (assetsLoaded >= totalAssets) {
        gameLoop(); 
    }
}
images.bird.onload = assetLoaded;
images.bg.onload = assetLoaded;
images.pipeTop.onload = assetLoaded;
images.pipeBottom.onload = assetLoaded;



function draw() {
    ctx.drawImage(images.bg, 0, 0, canvas.width, canvas.height);


    for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
        
        ctx.drawImage(images.pipeTop, p.x, p.yTop, PIPE_WIDTH, p.hTop);
        
        ctx.drawImage(images.pipeBottom, p.x, p.yBottom, PIPE_WIDTH, p.hBottom);
    }

    ctx.drawImage(images.bird, bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);
    ctx.strokeText("Score: " + score, 10, canvas.height - 20);

    if (gameState !== 'playing') {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#FFF";
        ctx.font = "40px Arial";
        ctx.textAlign = 'center';
        
        if (gameState === 'ready') {
            ctx.fillText("Clique para Iniciar", canvas.width / 2, canvas.height / 2);
        } else if (gameState === 'gameover') {
            ctx.fillText("FIM DE JOGO!", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "20px Arial";
            ctx.fillText("Clique para Recomeçar", canvas.width / 2, canvas.height / 2 + 30);
        }
        ctx.textAlign = 'left';
    }
}


function update() {
    if (gameState !== 'playing') return;

    bird.dy += GRAVITY;
    bird.y += bird.dy;

    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver();
        return;
    }

    if (frames % PIPE_SPAWN_RATE === 0) {
        const maxTopH = canvas.height - 100 - PIPE_GAP;
        const hTop = Math.floor(Math.random() * (maxTopH - 50)) + 50; 
        
        pipes.push({
            x: canvas.width,
            yTop: 0,
            hTop: hTop,
            yBottom: hTop + PIPE_GAP,
            hBottom: canvas.height - hTop - PIPE_GAP,
            passed: false
        });
    }

    for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
        p.x -= PIPE_SPEED;

        if (p.x + PIPE_WIDTH < bird.x && !p.passed) {
            score++;
            p.passed = true;
        }

        if (
            bird.x + bird.width > p.x && 
            bird.x < p.x + PIPE_WIDTH &&
            (bird.y < p.hTop || bird.y + bird.height > p.yBottom)
        ) {
            gameOver();
            return;
        }
    }

    pipes = pipes.filter(p => p.x > -PIPE_WIDTH);

    frames++;
}

function jump() {
    bird.dy = JUMP_POWER;
}


function startGame() {
    bird.y = canvas.height / 2;
    bird.dy = 0;
    pipes = [];
    score = 0;
    frames = 0;
    gameState = 'playing';
}


function gameOver() {
    if (gameState === 'playing') {
        gameState = 'gameover';
    }
}

function gameLoop() {

    update();
    
    draw();

    requestAnimationFrame(gameLoop);
}


canvas.addEventListener('click', () => {
    if (gameState === 'ready' || gameState === 'gameover') {
        startGame();
    } else if (gameState === 'playing') {
        jump();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover') {
            startGame();
        } else if (gameState === 'playing') {
            jump();
        }
    }
});
