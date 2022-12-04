const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft= document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let bombPosition = [];

giftPosition = {
    x: undefined,
    y: undefined,
};

const playerPosition = {
    x: undefined,
    y: undefined,
};

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.8;
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
    
    startGame();
}

function startGame() {
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    game.font = (elementsSize * 0.9) + 'px Verdana';
    game.textAlign = 'end';
    
    bombPosition = [];
    game.clearRect(0, 0, canvasSize, canvasSize); 

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 3;
            const posY = elementsSize * (rowI + 1) - 7;

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;                    
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                bombPosition.push({
                    x: posX,
                    y: posY,
                })
            }
            
            game.fillText(emoji, posX, posY)     
        });
    });
    movePlayer()
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);    
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);    
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const bombCollision = bombPosition.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
        const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    level++;
    startGame();
}

function levelFail () {
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego!!!');
}

function showLives() {
    const heartsArray =  Array(lives).fill(emojis['HEART']);
    console.log({heartsArray});

    spanLives.innerHTML = '';

    for (heart of heartsArray) {
        spanLives.innerHTML += heart;
    }
}

window.addEventListener("keydown", (e) => {
    let tecla = e.key;

    switch (tecla) {
        case "ArrowUp":
            moveUp();
            break;

        case "ArrowDown":
            moveDown();
            break;

        case "ArrowLeft":
            moveLeft();
            break;

        case "ArrowRight":
            moveRight();
            break;

        default:
            break;
        }
});

function moveUp() {
    if ((playerPosition.y - elementsSize - 4) > 0) {
        playerPosition.y -= elementsSize;        
    }
    startGame();
}

function moveLeft() {
    if ((playerPosition.x - elementsSize - 4) > 0) {
        playerPosition.x -= elementsSize;        
    }
    startGame();
}

function moveRight() {
    if ((playerPosition.x + elementsSize - 4) < canvasSize) {
        playerPosition.x += elementsSize;        
    }
    startGame();
}

function moveDown() {
    if ((playerPosition.y + elementsSize - 4) < canvasSize) {
        playerPosition.y += elementsSize;        
    }
    startGame();
}



    //  for (let row = 1; row <= 10; row++) {
    //      for (let column = 1; column <= 10; column++) {
    //          game.fillText(emojis[mapRowCols[row - 1][column - 1]], column * elementsSize + 6, row * elementsSize - 10);            
    //         }
    //     }
    // }
    
    // Tablero de ajedrez
    // game.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // let numeroDeFilas = 10;
    // let square = canvas.clientWidth / numeroDeFilas;
    // for (let x = 0; x < numeroDeFilas; x++) {
    //     for (let y = 0; y < numeroDeFilas; y++) {
    //         if (x % 2 == 0) {
    //             if (y % 2 == 0) {
    //                 game.clearRect(x * square, y * square, square, square);                    
    //                 } else {
    //                     game.clearRect(x * square + square, y * square, square, square);
    //                 }
    //             }
    //         }
    //     }