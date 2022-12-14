const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft= document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

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

let timeStart;
let timePlayer;
let timeInterval;
let colLast;
let rowLast;
let timer;

let bombPosition = [];

giftPosition = {
    x: undefined,
    y: undefined,
};

const playerPosition = {
    x: undefined,
    y: undefined,
};

const playerPositionRowCol = {
    x: undefined,
    y: undefined,
};

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.7;

    canvasSize = Number(canvasSize.toFixed(2));
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
    elementsSize = Number(elementsSize.toFixed(2))

    playerPosition.x = elementsSize * (playerPositionRowCol.x + 1) + 3;
    playerPosition.y = elementsSize * (playerPositionRowCol.y + 1) - 7;
    
    startGame();
}

function startGame() {
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    // console.log('startGame', lives);
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
                    playerPositionRowCol.x = colI;
                    playerPositionRowCol.y = rowI;                 
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
    let bombCollisionX;
    let bombCollisionY;
    let bombX;
    let bombY;

    if (giftCollision) {
        levelWin();
    }

    const bombCollision = bombPosition.find(bomb => {
        bombX = bomb.x;
        bombY = bomb.y;
        bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
        bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        setTimeout(function(){
            game.fillText(emojis['BOMB_COLLISION'], bombX - 10, bombY);
        }, 50);        

        bombPosition.forEach((rowX, rowXI) => {
            timer = setTimeout(() => {                    
                console.log(bombPosition.length, rowXI, timer, playerPosition);
                game.fillText(emojis['BOMB_COLLISION'], rowX.x - 10, rowX.y);
            }, (rowXI + 1) * 70);
        });
        
        setTimeout(() => {
            levelFail();
        }, bombPosition.length * 75);
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
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    // setTimeout(() => {
        startGame();
    // }, bombPosition.length * 100);
}

function gameWin() {
    console.log('Terminaste el juego!!!');
    clearInterval(timeInterval);
    
    const playerTime = Date.now() - timeStart;
    const recordTime = localStorage.getItem('record_time');

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'SUPERASTE EL RECORD';
        } else {
            pResult.innerHTML = 'lo siento, no superaste el record :(';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
    }
    level = 0;
    lives++;
    startGame();
}

function showLives() {
    const heartsArray =  Array(lives).fill(emojis['HEART']);
    // console.log({heartsArray});

    spanLives.innerHTML = '';

    for (heart of heartsArray) {
        spanLives.innerHTML += heart;
    }
}

function showTime() {
    function addZ(n) {
        return (n<10? '0':'') + n;
    }

    var ms = (Date.now() - timeStart) % 1000;
    s = ((Date.now() - timeStart) - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    spanTime.innerHTML = addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)+ '.' + addZ(ms);
}

function showRecord() {
    function addZ(n) {
        return (n<10? '0':'') + n;
    }

    var ms = localStorage.getItem('record_time') % 1000;
    s = (localStorage.getItem('record_time') - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    spanRecord.innerHTML = addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)+ '.' + addZ(ms);
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
    console.log(timer);
    clearTimeout(timer);
    if ((playerPosition.y - elementsSize - 4) > 0) {
        playerPosition.y -= elementsSize;        
        playerPositionRowCol.x = ((playerPosition.x - 3) / elementsSize) - 1;
        playerPositionRowCol.y = ((playerPosition.y + 7) / elementsSize) - 1;
    }
    startGame();
}

function moveLeft() {
    if ((playerPosition.x - elementsSize - 4) > 0) {
        playerPosition.x -= elementsSize;        
        playerPositionRowCol.x = ((playerPosition.x - 3) / elementsSize) - 1;
        playerPositionRowCol.y = ((playerPosition.y + 7) / elementsSize) - 1;      
    }
    startGame();    
}

function moveRight() {
    if ((playerPosition.x + elementsSize - 4) < canvasSize) {
        playerPosition.x += elementsSize;         
        playerPositionRowCol.x = ((playerPosition.x - 3) / elementsSize) - 1;
        playerPositionRowCol.y = ((playerPosition.y + 7) / elementsSize) - 1;     
    }
    startGame();
}

function moveDown() {
    if ((playerPosition.y + elementsSize - 4) < canvasSize) {
        playerPosition.y += elementsSize;      
        playerPositionRowCol.x = ((playerPosition.x - 3) / elementsSize) - 1;
        playerPositionRowCol.y = ((playerPosition.y + 7) / elementsSize) - 1;        
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