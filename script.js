const circle = document.getElementById('circle');
const gameContainer = document.getElementById('game-container');
let circlePosition = { left: 50, bottom: 50 };
let isJumping = false;
let gravity = 2;
let jumpHeight = 100;
let intervalId;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        moveCircle(10); // Move right
    } else if (e.key === 'ArrowUp' && !isJumping) {
        jump();
    }
});

function moveCircle(amount) {
    circlePosition.left += amount;

    if(circlePosition.left > gameContainer.clientWidth - 40) {
        circlePosition.left = gameContainer.clientWidth - 40; // Prevent moving out of bounds
    }

    updateCirclePosition();
    checkCollisionWithDoor();
}

function jump() {
    isJumping = true;
    let jumpStart = circlePosition.bottom;

    intervalId = setInterval(() => {
        if (circlePosition.bottom >= jumpStart + jumpHeight) {
            clearInterval(intervalId);
            fall();
        } else {
            circlePosition.bottom += 20; // Move up
            updateCirclePosition();
        }
    }, 20);
}

function fall() {
    intervalId = setInterval(() => {
        if (circlePosition.bottom <= 50) {
            clearInterval(intervalId);
            circlePosition.bottom = 50; // Reset to ground level
            isJumping = false;
        } else {
            circlePosition.bottom -= gravity; // Move down
            updateCirclePosition();
        }
    }, 20);
}

function updateCirclePosition() {
    circle.style.left = `${circlePosition.left}px`;
    circle.style.bottom = `${circlePosition.bottom}px`;
}

function checkCollisionWithDoor() {
    const door = document.querySelector('.door');
    const doorRect = door.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    if (
        circleRect.left < doorRect.right &&
        circleRect.right > doorRect.left &&
        circleRect.bottom < doorRect.bottom &&
        circleRect.top > doorRect.top
    ) {
        alert('Level Complete!'); // Trigger level change or notification
        resetGame();
    }
}

function resetGame() {
    circlePosition = { left: 50, bottom: 50 };
    updateCirclePosition();
}
