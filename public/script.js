let timer;
let timerRunning = false;
let elapsedSeconds = 0;

function toggleTimer() {
    if (timerRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(() => {
            elapsedSeconds++;
            document.getElementById('workout-time').innerText = formatTime(elapsedSeconds);
        }, 1000);
    }
    timerRunning = !timerRunning;
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    elapsedSeconds = 0;
    document.getElementById('workout-time').innerText = formatTime(elapsedSeconds);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

document.querySelectorAll('#workout-rating .star').forEach(star => {
    star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-value');
        updateRating(rating);
    });
});

function updateRating(rating) {
    document.querySelectorAll('#workout-rating .star').forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.style.color = 'yellow';
        } else {
            star.style.color = 'transparent';
            star.style.webkitTextStroke = '1px yellow';
        }
    });
}

