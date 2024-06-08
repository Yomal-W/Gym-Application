// Variables to keep track of the timer and exercises
let timer;
let timerRunning = false;
let elapsedSeconds = 0;
let exercises = [];
let workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || []; //Acknowledgement of ChatGPT - Prompt: In JavaScript, how can I store and retrieve an array of objects from local storage?

// When the page loads, render the workout history
document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
});

// Function to toggle the timer on and off
function toggleTimer() {
    if (timerRunning) {
        // If timer is running, stop it
        clearInterval(timer);
    } else {
        // If timer is not running, start it
        timer = setInterval(() => {
            elapsedSeconds++;
            document.getElementById('workout-time').innerText = formatTime(elapsedSeconds);
        }, 1000);
    }
    timerRunning = !timerRunning;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    elapsedSeconds = 0;
    document.getElementById('workout-time').innerText = formatTime(elapsedSeconds);
}

// Function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add click event listeners to stars for workout rating
document.querySelectorAll('#workout-rating .star').forEach(star => { //Acknowledgement of ChatGPT - Prompt: Process of creating a star rating system with JavaScript
    star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-value');
        updateRating(rating);
    });
});

// Function to update workout rating
function updateRating(rating) {
    document.querySelectorAll('#workout-rating .star').forEach(star => { //Acknowledgement of ChatGPT - Prompt: I am having trouble changingg the colour of the stars when they are clicked. How can I fix this?
        if (star.getAttribute('data-value') <= rating) {
            // Fill the star if it's less than or equal to the rating
            star.style.color = '#333333';
            star.style.webkitTextStroke = '1px #333333';
        } else {
            // Empty the star if it's greater than the rating
            star.style.color = 'transparent';
            star.style.webkitTextStroke = '1px #333333';
        }
    });
    document.getElementById('workout-rating').setAttribute('data-rating', rating);
}

// Show the exercise selection screen when "Add Exercise" is clicked
document.getElementById('add-exercise').addEventListener('click', () => {
    document.getElementById('exercise-selection').style.display = 'block';
});

// Function to select an exercise
function selectExercise(exerciseName) {
    document.getElementById('exercise-selection').style.display = 'none';
    exercises.push({
        name: exerciseName,
        sets: []
    });
    renderExercises();
}

// Function to render exercises
function renderExercises() { //Acknowledgement of ChatGPT - Prompt: I have made an excersise array. What is the process of writing JavaScript where a function renders dynamically based on the exercises array. 
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

// Function to add a set to an exercise
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

// Function to remove the last set from an exercise
function removeSet(exerciseIndex) {
    if (exercises[exerciseIndex].sets.length > 0) {
        exercises[exerciseIndex].sets.pop();
    }
    renderExercises();
}

// Function to remove an exercise
function removeExercise(exerciseIndex) {
    exercises.splice(exerciseIndex, 1);
    renderExercises();
}

// When "Finish Workout" is clicked, save the workout and reset
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

    // Save workout to history
    workoutHistory.push(workoutData);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    renderHistory();
    clearWorkout();
});

// Function to calculate average weight lifted
function calculateAverageWeight() { //Acknowledgement of ChatGPT - Prompt: How can I calculate the average value of an array of objects in JavaScript?
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

// Function to render workout history
function renderHistory() {
    const historyContainer = document.getElementById('workout-history');
    historyContainer.innerHTML = '';
    workoutHistory.forEach((workout, index) => {
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
            <button onclick="deleteWorkout(${index})">Delete</button>
        `;
        historyContainer.appendChild(workoutElement);
    });
}

// Function to delete a workout from history
function deleteWorkout(index) {
    workoutHistory.splice(index, 1);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    renderHistory();
}

// Function to clear workout form
function clearWorkout() {
    document.getElementById('workout-title').value = '';
    resetTimer();
    updateRating(0);
    exercises = [];
    renderExercises();
}

// Cancel workout button clears the form
document.getElementById('cancel-workout').addEventListener('click', () => {
    clearWorkout();
});