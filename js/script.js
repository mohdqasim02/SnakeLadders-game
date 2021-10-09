const board = document.getElementById('#board');
const dice = document.getElementById("dice");
const turn = document.querySelector('.turn');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const shake = new Audio('sound/DICE.wav');
let player = null;
let step = 0;
let post = { x: 10, y: 1 };
let score = { p1: 0, p2: 0 };
let change = true;
let game = true;

// setting the board
const boards = [];
for (let i = 0; i <= 100; i++) {
    boards[i] = 0;
}
boards[5] = 20;
boards[10] = 19;
boards[22] = 19;
boards[28] = 27;
boards[31] = -17;
boards[37] = -20;
boards[44] = 51;
boards[70] = 19;
boards[73] = -20;
boards[78] = -39;
boards[79] = 2;
boards[92] = -57;
boards[99] = -92;

// counting step
function countStep(steps, index, player) {
    if (index == 0 && steps != 6) { game = true; return };
    // player.style.transform = 'scale(0.6)';
    if (index + steps > 100) { game = true; return };
    if (player === player1)
        score.p1 = index += steps;
    else
        score.p2 = index += steps;
    row = 10 - Math.floor((index - 1) / 10);
    column = index % 10;
    post.x = row
    if (row % 2 == 0 && column < 10) {
        if (column == 0)
            post.y = 10;
        else
            post.y = column;
    }
    else {
        if (column == 0)
            post.y = 1;
        else
            post.y = 11 - column;
    }
    move();
    if (boards[index] != 0)
        countStep(boards[index], index, player);
    console.log(score);
    game = true;
    gameOver();
}
function move() {
    player.style.gridColumnStart = post.y;
    player.style.gridRowStart = post.x;
    // console.log(post);
}

// Rolling the dice

function roll(goat) {
    if (gameOver()) return;
    if (game) {
        shake.play();
        step = Math.ceil(Math.random() * 6);
        dice.innerText = step;
        player = goat;
        if (step != 6)
            change = !change;
        dice.classList.add('scale');
        game = false
    }
}

function choosePlayer() {
    if (change) roll(player1);
    else roll(player2);
}
function chance() {
    if (change) {
        turn.innerText = "Red Player Turn !!";
        turn.style.color = 'red';
    }
    else {
        turn.innerText = "Blue Player Turn !!";
        turn.style.color = 'blue';
    }
}

function gameOver() {
    if (score.p1 == 100) {
        turn.innerText = "Player Red Won !!!";
        turn.style.color = 'red';
        document.querySelector('.heading').innerText = "Press F5 to play again";
        return true;
    }
    else if (score.p2 == 100) {
        turn.innerText = "Player Blue Won !!!";
        turn.style.color = 'blue';
        document.querySelector('.heading').innerText = "Press F5 to play again";
        return true;
    }
    return false;
}


dice.addEventListener('click', () => { game && choosePlayer() });
dice.addEventListener('transitionend', (e) => {
    if (dice.classList.contains('scale')) {
        if (player === player1)
            countStep(step, score.p1, player1);
        else if (player === player2)
            countStep(step, score.p2, player2);
    }
    dice.classList.remove('scale');
    chance();
    step = 0;
});