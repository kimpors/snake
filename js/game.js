import { player } from "./module/player.js";
import { snake, DIRECTION } from "./module/snake.js";
import { fruit } from "./module/fruit.js";


const cv = document.querySelector("#field");
const ctx = cv.getContext("2d");

const width = cv.width, height = cv.height, RED = 255;

snake.x = width / 2;
snake.y = height / 2;

function Paint(x, y, size) {
    ctx.fillRect(x.toFixed(), y.toFixed(), size.toFixed(), size.toFixed());
}
function Clear(x, y, size) {
    ctx.clearRect(x.toFixed(), y.toFixed(), size.toFixed(), size.toFixed());
}

let tailCor = [{ x: snake.x, y: snake.y }];
let timerId = 0, gameId = 0;
let canMove = true;

ctx.fillStyle = localStorage.getItem("color") == null ? "green" : localStorage.getItem("color");
Paint(snake.x, snake.y, snake.size);


document.addEventListener("keydown", (e) => {
    if (!canMove) return false;
    canMove = false;
    setTimeout(() => { canMove = true; }, 10);

    switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
            if (snake.direction != DIRECTION.RIGHT)
                snake.direction = DIRECTION.LEFT;
            break;

        case "KeyW":
        case "ArrowUp":
            if (snake.direction != DIRECTION.DOWN)
                snake.direction = DIRECTION.UP;
            break;

        case "KeyD":
        case "ArrowRight":
            if (snake.direction != DIRECTION.LEFT)
                snake.direction = DIRECTION.RIGHT;
            break;

        case "KeyS":
        case "ArrowDown":
            if (snake.direction != DIRECTION.UP)
                snake.direction = DIRECTION.DOWN;
            break;
    }
});

function Game() {
    ctx.fillStyle = localStorage.getItem("color") == null ? "green" : localStorage.getItem("color");

    if (!snake.isGrow) {
        Clear(tailCor[tailCor.length - 1].x, tailCor[tailCor.length - 1].y, Math.floor(snake.size));
        tailCor.pop();
    }
    else {
        snake.isGrow = false;

        if (snake.size < 30) {
            snake.size += 0.2;

            document.querySelector("#size").textContent = `Size: ${Math.floor(snake.size) - 4}`;
        }

    }

    const step = Math.floor(snake.size);

    switch (snake.direction) {
        case DIRECTION.LEFT:
            if (snake.x > 0) snake.x -= step;
            else {
                snake.x = width;
            }
            break;
        case DIRECTION.UP:
            if (snake.y > 0) snake.y -= step;
            else {
                snake.y = height;
            }
            break;

        case DIRECTION.RIGHT:
            if (snake.x < width) snake.x += step;
            else {
                snake.x = -snake.size;
            }
            break;

        case DIRECTION.DOWN:
            if (snake.y < height) snake.y += step;
            else {
                snake.y = -snake.size;
            }
            break;
    }


    for (let i = 1; i < tailCor.length; i++) {
        let currTail = tailCor[i];

        switch (snake.direction) {
            case DIRECTION.RIGHT:
            case DIRECTION.LEFT:
                for (let j = -1 * step / 2; j < step / 2; j++) {

                    let y = snake.y + j;
                    if (y == (currTail.y - step / 2) || y == (currTail.y + step / 2)) {

                        if (snake.x > (currTail.x - step) && snake.x < (currTail.x + step)) {
                            GameOver();
                        }
                    }
                }
                break;

            case DIRECTION.UP:
            case DIRECTION.DOWN:
                for (let j = -1 * step / 2; j < step / 2; j++) {

                    let x = snake.x + j;
                    if (x == (currTail.x - step / 2) || x == (currTail.x + step / 2)) {

                        if (snake.y > (currTail.y - step) && snake.y < (currTail.y + step)) {
                            GameOver();
                        }
                    }
                }
                break;
        }
    }

    tailCor.unshift({ x: snake.x, y: snake.y });
    Paint(tailCor[0].x, tailCor[0].y, step);


    let fruitData = ctx.getImageData(fruit.x, fruit.y, fruit.size, fruit.size).data;
    for (let i = 0; i < fruitData.length; i += 4) {

        if (i + 4 >= fruitData.length && fruitData[i] < RED) {
            Grow();
        }
        else if (fruitData[i] == RED) {
            break;
        }
    }
}

function GameOver() {
    clearInterval(gameId);
    clearInterval(timerId);

    if (localStorage.getItem('fruitCount') == null || localStorage.getItem("fruitCount") < player.fruitCount)
        localStorage.setItem('fruitCount', player.fruitCount)

    alert(`\tGame over`);

    document.location.replace("../index.html");
}

function Grow() {
    player.fruitCount++;
    document.querySelector("#fruitCount").textContent = `Tail length: ${player.fruitCount}`;

    ctx.fillStyle = "red";

    fruit.x = Math.floor(Math.random() * (width - fruit.size * 2));
    fruit.y = Math.floor(Math.random() * (height - fruit.size * 2));

    for (let i = 0; i < tailCor.length; i++) {
        if (fruit.x == tailCor[i].x) {
            i = 0;
            fruit.x += fruit.size;

            if (fruit.x > width)
                fruit.x = 2 * fruit.size;
        }

        if (fruit.y == tailCor[i].y) {
            i = 0;
            fruit.y += fruit.size;

            if (fruit.y > height)
                fruit.y = 2 * fruit.size;
        }
    }

    snake.isGrow = true;
    Paint(fruit.x, fruit.y, fruit.size);
}


Grow();
gameId = setInterval(Game, 19);


const start = performance.now();

timerId = setInterval(() => {
    player.time = (performance.now() - start) / 1000;

    let res = 0;
    if (player.time > 60) {
        res = `Time: ${(player.time / 60).toFixed()}m`;
    }
    else {
        res = `Time: ${player.time.toFixed()}s`
    }

    document.querySelector("#time").textContent = res;
}, 1000);



