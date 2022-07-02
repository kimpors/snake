
const DIRECTION = {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};

let snake = {
    size: 5,
    x: 0,
    y: 0,
    direction: DIRECTION.LEFT,
    isGrow: false
};

export { snake, DIRECTION };