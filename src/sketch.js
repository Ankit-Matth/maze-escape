let rowsCount;
let colsCount;
let grid = [];
let player;
let destination;
let foodImage;
let ratImage;
let totalMoves = 0;
let win = false;

let moveSound;
let difficultySound;
let winSound;

const difficultySelect = document.getElementById("difficulty-select");

function preload() {
    foodImage = loadImage("images/food.png");
    ratImage = loadImage("images/rat.png");

    moveSound = loadSound("audio/moves.wav");
    difficultySound = loadSound("audio/difficulty.wav");
    winSound = loadSound("audio/win.mp3");
}

function drawSimpleRatFace(x, y, w, h) {
    push();
    fill(255, 150, 150);
    stroke(0);
    strokeWeight(2);
    ellipse(x + w / 2, y + h / 2, w - 4, h - 4);

    fill(0);
    ellipse(x + w / 2 - w / 5, y + h / 2 - h / 8, w / 8, h / 8);
    ellipse(x + w / 2 + w / 5, y + h / 2 - h / 8, w / 8, h / 8);

    fill(255, 150, 150);
    triangle(
        x + w / 2,
        y + h / 2 - h / 18,
        x + w / 2 - w / 20,
        y + h / 2 + h / 7,
        x + w / 2 + w / 20,
        y + h / 2 + h / 7,
    );
    pop();
}

function drawFood(x, y, w, h) {
    push();
    fill(0, 255, 0);
    stroke(0);
    strokeWeight(2);
    ellipse(x + w / 2, y + h / 2, w - 4, h - 4);
    pop();
}

function drawRat(x, y, w, h) {
    push();
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(2);
    ellipse(x + w / 2, y + h / 2, w - 4, h - 4);
    pop();
}

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.walls = [true, true, true, true];
        this.isExistInPath = false;
    }

    show() {
        const x = (this.j * width) / colsCount;
        const y = (this.i * height) / rowsCount;
        stroke(0);

        if (this.walls[0]) line(x, y, x + width / colsCount, y);
        if (this.walls[1]) {
            line(x + width / colsCount, y, x + width / colsCount, y + height / rowsCount);
        }
        if (this.walls[2]) {
            line(x, y + height / rowsCount, x + width / colsCount, y + height / rowsCount);
        }
        if (this.walls[3]) line(x, y, x, y + height / rowsCount);

        if (this.isExistInPath === true) {
            push();
            fill(90);
            const w = width / colsCount;
            const h = height / rowsCount;

            rect(x + w / 3, y + h / 3, w / 6, h / 6);
            pop();
        }

        if (this === player) {
            if (difficultySelect.value === "10") {
                image(ratImage, x, y, width / colsCount - 2, height / rowsCount + 8);
            } else if (difficultySelect.value === "20") {
                drawSimpleRatFace(x, y, width / colsCount, height / rowsCount);
            } else {
                drawRat(x, y, width / colsCount, height / rowsCount);
            }
        } else if (this === destination) {
            if (difficultySelect.value === "30") {
                drawFood(x, y, width / colsCount, height / rowsCount);
            } else {
                image(foodImage, x, y, width / colsCount - 4, height / rowsCount - 4);
            }
        }
    }

    checkNeighbors() {
        const neighbors = [];

        const top = grid[this.i - 1] && grid[this.i - 1][this.j];
        const right = grid[this.i][this.j + 1];
        const bottom = grid[this.i + 1] && grid[this.i + 1][this.j];
        const left = grid[this.i][this.j - 1];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            const r = floor(random(0, neighbors.length));
            return neighbors[r];
        }

        return undefined;
    }
}

function removeWalls(a, b) {
    const i = a.i - b.i;
    if (i === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (i === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

    const j = a.j - b.j;
    if (j === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (j === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
}

function generateMaze() {
    const stack = [];
    let current = grid[0][0];
    current.visited = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }
}

function resetVisited() {
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < colsCount; j++) {
            grid[i][j].visited = false;
        }
    }
}

function resetIsExistInPath() {
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < colsCount; j++) {
            grid[i][j].isExistInPath = false;
        }
    }
}

function findPath(cell, path) {
    if (cell === destination) {
        path.push(cell);
        return true;
    }

    if (cell.visited) {
        return false;
    }

    cell.visited = true;

    if (cell.i > 0 && !cell.walls[0] && findPath(grid[cell.i - 1][cell.j], path)) {
        path.push(cell);
        return true;
    }

    if (cell.j < colsCount - 1 && !cell.walls[1] && findPath(grid[cell.i][cell.j + 1], path)) {
        path.push(cell);
        return true;
    }

    if (cell.i < rowsCount - 1 && !cell.walls[2] && findPath(grid[cell.i + 1][cell.j], path)) {
        path.push(cell);
        return true;
    }

    if (cell.j > 0 && !cell.walls[3] && findPath(grid[cell.i][cell.j - 1], path)) {
        path.push(cell);
        return true;
    }

    return false;
}

function highlightPath(cell) {
    if (cell === destination) {
        return true;
    }

    if (cell.visited) {
        return false;
    }

    cell.visited = true;

    if (cell.i > 0 && !cell.walls[0] && highlightPath(grid[cell.i - 1][cell.j])) {
        cell.isExistInPath = true;
        return true;
    }

    if (cell.j < colsCount - 1 && !cell.walls[1] && highlightPath(grid[cell.i][cell.j + 1])) {
        cell.isExistInPath = true;
        return true;
    }

    if (cell.i < rowsCount - 1 && !cell.walls[2] && highlightPath(grid[cell.i + 1][cell.j])) {
        cell.isExistInPath = true;
        return true;
    }

    if (cell.j > 0 && !cell.walls[3] && highlightPath(grid[cell.i][cell.j - 1])) {
        cell.isExistInPath = true;
        return true;
    }

    return false;
}
let autoSolved = false;
const hintBtn = document.getElementById("hint-button");
const solveBtn = document.getElementById("solve-button");

function showHint() {
    resetVisited();
    highlightPath(player);
}

hintBtn.addEventListener("click", () => {
    if (hintBtn.innerText === "Hint") {
        hintBtn.innerText = "Hide";
        showHint();
    } else {
        hintBtn.innerText = "Hint";
        resetIsExistInPath();
    }
});

let timeoutIds = [];

function solve() {
    timeoutIds.forEach((timeoutId) => {
        clearTimeout(timeoutId);
    });
    timeoutIds = [];

    if (solveBtn.innerText === "Solve") {
        resetVisited();
        const path = [];
        findPath(player, path);

        path.slice()
            .reverse()
            .forEach((element, index) => {
                const timeoutId = setTimeout(
                    () => {
                        player = grid[element.i][element.j];
                        if (hintBtn.innerText === "Hide") {
                            resetIsExistInPath();
                            showHint();
                        }
                        if (index === path.length - 1) {
                            winSound.play();
                            setTimeout(() => {
                                win = true;
                                totalMoves = path.length - 1;
                            }, 700);
                        }
                    },
                    100 * index - difficultySelect.value,
                );

                timeoutIds.push(timeoutId);
            });
    }
}

function stopAutoSolve() {
    timeoutIds.forEach((timeoutId) => {
        clearTimeout(timeoutId);
    });
    timeoutIds = [];
}

solveBtn.addEventListener("click", () => {
    if (solveBtn.innerText === "Solve") {
        autoSolved = true;
        solve();
        solveBtn.innerText = "Stop";
    } else {
        solveBtn.innerText = "Solve";
        stopAutoSolve();
    }
});

function setup() {
    grid = [];
    totalMoves = 0;
    autoSolved = false;
    hintBtn.innerText = "Hint";
    solveBtn.innerText = "Solve";
    stopAutoSolve();
    rowsCount = difficultySelect.value;
    colsCount = difficultySelect.value;
    difficultySound.play();

    const canvasElement = document.getElementById("game-canvas");
    const canvasWidth = canvasElement.clientWidth;
    const canvasHeight = canvasElement.clientHeight;

    const myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent("game-canvas");

    for (let i = 0; i < rowsCount; i++) {
        const rows = [];
        for (let j = 0; j < colsCount; j++) {
            rows.push(new Cell(i, j));
        }
        grid.push(rows);
    }

    // eslint-disable-next-line prefer-destructuring
    player = grid[0][0];
    // eslint-disable-next-line prefer-destructuring
    destination = grid[rowsCount - 1][colsCount - 1];

    generateMaze();

    player.visited = true;
    resetIsExistInPath();
}

function draw() {
    if (win) {
        push();
        background(220);
        document.getElementsByClassName("bottom")[0].style.display = "none";
        textAlign(CENTER, CENTER);
        textFont("Verdana");

        textSize(30);
        text("🎉👏🏆👏🎉", width / 2, height / 3.5);

        textSize(40);
        text("Congratulations!", width / 2, height / 2.4);

        if (autoSolved) {
            textSize(18);
            text("You used auto-solve feature.", width / 2, height / 1.8);
        } else {
            textSize(18);
            text(`You completed in ${totalMoves} moves.`, width / 2, height / 1.8);
        }

        const buttonWidth = 100;
        const buttonHeight = 40;
        const buttonX = width / 2;
        const buttonY = height / 1.4;

        if (
            mouseX > buttonX - buttonWidth / 2
            && mouseX < buttonX + buttonWidth / 2
            && mouseY > buttonY - buttonHeight / 2
            && mouseY < buttonY + buttonHeight / 2
        ) {
            fill(150);
            cursor("pointer");
        } else {
            fill(200);
            cursor(ARROW);
        }

        rectMode(CENTER);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 8);

        fill(0);
        textSize(16);
        text("Restart", buttonX, buttonY + 2);
        pop();

        if (
            mouseIsPressed
            && mouseX > buttonX - buttonWidth / 2
            && mouseX < buttonX + buttonWidth / 2
            && mouseY > buttonY - buttonHeight / 2
            && mouseY < buttonY + buttonHeight / 2
        ) {
            cursor(ARROW);
            win = false;
            winSound.stop();
            setup();
        }
    } else {
        document.getElementsByClassName("bottom")[0].style.display = "flex";
        background(255);

        for (let i = 0; i < rowsCount; i++) {
            for (let j = 0; j < colsCount; j++) {
                grid[i][j].show();
            }
        }
    }
}

difficultySelect.addEventListener("change", () => {
    setup();
    difficultySound.play();
    difficultySelect.blur();
});

function movePlayer(di, dj) {
    player.visited = false;
    player = grid[player.i + di][player.j + dj];
    player.visited = true;
    moveSound.stop();
    totalMoves++;
    moveSound.play();

    if (hintBtn.innerText === "Hide") {
        resetIsExistInPath();
        showHint();
    }

    if (player === destination) {
        winSound.play();
        setTimeout(() => {
            win = true;
        }, 700);
    }
}

function moveUp() {
    if (player.i > 0 && !player.walls[0]) {
        movePlayer(-1, 0);
    }
}

function moveDown() {
    if (player.i < rowsCount - 1 && !player.walls[2]) {
        movePlayer(1, 0);
    }
}

function moveLeft() {
    if (player.j > 0 && !player.walls[3]) {
        movePlayer(0, -1);
    }
}

function moveRight() {
    if (player.j < colsCount - 1 && !player.walls[1]) {
        movePlayer(0, 1);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        moveUp();
    } else if (keyCode === DOWN_ARROW) {
        moveDown();
    } else if (keyCode === LEFT_ARROW) {
        moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
        moveRight();
    }
}
