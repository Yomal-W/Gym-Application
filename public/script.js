let timer;
let timerRunning = false;
let elapsedSeconds = 0;
let exercises = [];
let workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];

// Load workout history on page load
document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
});

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
    document.getElementById('workout-rating').setAttribute('data-rating', rating);
}

document.getElementById('add-exercise').addEventListener('click', () => {
    document.getElementById('exercise-selection').style.display = 'block';
});

function selectExercise(exerciseName) {
    document.getElementById('exercise-selection').style.display = 'none';
    exercises.push({
        name: exerciseName,
        sets: []
    });
    renderExercises();
}

function renderExercises() {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';
    exercises.forEach((exercise, index) => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise';
        exerciseElement.innerHTML = `
            <h4>${exercise.name}</h4>
            <table>
                <tr>
                    <th>Set</th>
                    <th>KG</th>
                    <th>Reps</th>
                    <th>Status</th>
                </tr>
                ${exercise.sets.map((set, setIndex) => `
                    <tr>
                        <td>${setIndex + 1}</td>
                        <td>${set.kg}</td>
                        <td>${set.reps}</td>
                        <td><input type="checkbox" ${set.completed ? 'checked' : ''}></td>
                    </tr>
                `).join('')}
            </table>
            <button onclick="addSet(${index})">Add Set</button>
            <button onclick="removeSet(${index})">Remove Set</button>
            <button onclick="removeExercise(${index})">Remove Exercise</button>
        `;
        exerciseList.appendChild(exerciseElement);
    });
}

function addSet(exerciseIndex) {
    const kg = prompt('Enter weight (kg):');
    const reps = prompt('Enter reps:');
    exercises[exerciseIndex].sets.push({
        kg,
        reps,
        completed: false
    });
    renderExercises();
}

function removeSet(exerciseIndex) {
    if (exercises[exerciseIndex].sets.length > 0) {
        exercises[exerciseIndex].sets.pop();
    }
    renderExercises();
}

function removeExercise(exerciseIndex) {
    exercises.splice(exerciseIndex, 1);
    renderExercises();
}

document.getElementById('finish-workout').addEventListener('click', () => {
    const workoutTitle = document.getElementById('workout-title').value;
    const workoutTime = document.getElementById('workout-time').innerText;
    const averageWeight = calculateAverageWeight();
    const date = new Date().toLocaleDateString();
    const rating = document.getElementById('workout-rating').getAttribute('data-rating') || 0;

    const workoutData = {
        title: workoutTitle,
        time: workoutTime,
        averageWeight,
        date,
        rating,
        exercises: exercises.map(ex => ({
            name: ex.name,
            sets: ex.sets.length
        }))
    };

    workoutHistory.push(workoutData);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    renderHistory();
    clearWorkout();
});

function calculateAverageWeight() {
    let totalWeight = 0;
    let totalSets = 0;
    exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            totalWeight += parseInt(set.kg);
            totalSets++;
        });
    });
    return totalSets === 0 ? 0 : (totalWeight / totalSets).toFixed(2);
}

function renderHistory() {
    const historyContainer = document.getElementById('workout-history');
    historyContainer.innerHTML = '';
    workoutHistory.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.className = 'history-item';
        workoutElement.innerHTML = `
            <h4>${workout.title}</h4>
            <p>${workout.date}</p>
            <p>${workout.time} / Avg ${workout.averageWeight} kg</p>
            <p>Star rating: ${workout.rating}</p>
            <div>
                ${workout.exercises.map(ex => `
                    <p>${ex.sets} x ${ex.name}</p>
                `).join('')}
            </div>
        `;
        historyContainer.appendChild(workoutElement);
    });
}

function clearWorkout() {
    document.getElementById('workout-title').value = '';
    resetTimer();
    updateRating(0);
    exercises = [];
    renderExercises();
}

document.getElementById('cancel-workout').addEventListener('click', () => {
    clearWorkout();
});

