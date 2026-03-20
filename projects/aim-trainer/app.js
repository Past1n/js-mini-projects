const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['#38bdf8', '#fb7185', '#34d399', '#fbbf24', '#a78bfa', '#f472b6'];

let time = 0;
let score = 0;
let gameInterval = null;

// Transition from Welcome to Time Selection
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

// Select Time and Start Game
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

// Click on сircle logic
board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    gameInterval = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    clearInterval(gameInterval);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `
        <div class="result">
            <h1>Game Over</h1>
            <p style="font-size: 1.5rem;">Your Score: <span class="primary">${score}</span></p>
            <button class="restart-btn" onclick="location.reload()">Try Again</button>
        </div>
    `;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(15, 50);
    
    // Calculate board boundaries
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    
    const color = colors[Math.floor(Math.random() * colors.length)];

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    circle.style.boxShadow = `0 0 15px ${color}`;
    
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}