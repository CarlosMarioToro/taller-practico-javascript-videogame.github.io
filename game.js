const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft= document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

let canvasSize;
let elementsSize;
let indicator = true;

const playerPosition = {
    x: undefined,
    y: undefined,
}

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.8;
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
    
    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize });

    const mapRows = maps[0].trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.font = (elementsSize * 0.9) + 'px Verdana';
    game.textAlign = 'end';

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 3;
            const posY = elementsSize * (rowI + 1) - 7;

            if (col == 'O' && indicator == true) {
                playerPosition.x = posX;
                playerPosition.y = posY;
                indicator = false;
            }

            game.fillText(emoji, posX, posY)     
        });
    });
    movePlayer()
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
    clearGame();
    if ((playerPosition.y - elementsSize - 4) > 0) {
        playerPosition.y -= elementsSize;        
    }
    startGame();
    movePlayer();  
}

function moveLeft() {
    clearGame();
    if ((playerPosition.x - elementsSize - 4) > 0) {
        playerPosition.x -= elementsSize;        
    }
    startGame();
    movePlayer();
}

function moveRight() {
    clearGame();
    if ((playerPosition.x + elementsSize - 4) < canvasSize) {
        playerPosition.x += elementsSize;        
    }
    startGame();
    movePlayer();
}

function moveDown() {
    clearGame();
    if ((playerPosition.y + elementsSize - 4) < canvasSize) {
        playerPosition.y += elementsSize;        
    }
    startGame();
    movePlayer();
}

function clearGame() {
    game.clearRect(0, 0, canvasSize, canvasSize); 
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
    // console.log(square);
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