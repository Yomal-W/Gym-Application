document.addEventListener('DOMContentLoaded', (event) => {
    loadWorkoutHistory();
});

function showExerciseForm() {
    document.getElementById('exercise-form').style.display = 'block';
}

function cancelWorkout() {
    document.getElementById('exercise-form').style.display = 'none';
}

function selectMuscleGroup(group) {
    const exercises = getExercisesForGroup(group);
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';
    exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.classList.add('exercise');
        exerciseElement.innerHTML = `
            <h4 onclick="addExerciseToWorkout('${exercise.name}')">${exercise.name}</h4>
            <img src="images-gym-app/graduation-album-cover-kanye-west.jpg" alt="${exercise.name} Img">
            <p>${exercise.description}</p>
        `;
        exerciseList.appendChild(exerciseElement);
    });
}

function addExerciseToWorkout(exerciseName) {
    const exerciseEntryForm = document.getElementById('exercise-entry-form');
    const exerciseElement = document.createElement('div');
    exerciseElement.classList.add('exercise-entry');
    exerciseElement.innerHTML = `
        <h3>${exerciseName}</h3>
        <table>
            <thead>
                <tr>
                    <th>SET</th>
                    <th>KG</th>
                    <th>REPS</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="number" value="1" min="1"></td>
                    <td><input type="number" value="0" min="0"></td>
                    <td><input type="number" value="0" min="0"></td>
                    <td><input type="checkbox"></td>
                </tr>
            </tbody>
        </table>
        <button onclick="addSet(this)">Add Set</button>
    `;
    exerciseEntryForm.appendChild(exerciseElement);
}

function addSet(button) {
    const tbody = button.previousElementSibling.querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="number" value="1" min="1"></td>
        <td><input type="number" value="0" min="0"></td>
        <td><input type="number" value="0" min="0"></td>
        <td><input type="checkbox"></td>
    `;
    tbody.appendChild(newRow);
}

function getExercisesForGroup(group) {
    const exercises = {
        'Chest': [
            { name: 'Chest Press', description: 'Description of Chest Press' },
            { name: 'Chest Fly', description: 'Description of Chest Fly' }
        ],
        'Back': [
            { name: 'Lat Pulldown', description: 'Description of Lat Pulldown' },
            { name: 'Deadlift', description: 'Description of Deadlift' }
        ]
        // Add more groups and exercises as needed
    };
    return exercises[group] || [];
}

function loadWorkoutHistory() {
    const workoutHistory = [
        {
            title: 'Morning Workout',
            duration: '01:00',
            rating: 4,
            exercises: [
                { name: 'Chest Press', sets: 3, reps: 10, weight: '50kg' },
                { name: 'Squats', sets: 3, reps: 15, weight: '60kg' }
            ]
        }
    ];

    const workoutHistoryContainer = document.querySelector('.workout-history');
    workoutHistory.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.classList.add('workout-entry');
        workoutElement.innerHTML = `
            <h3>${workout.title}</h3>
            <p>Duration: ${workout.duration}</p>
            <p>Rating: ${'★'.repeat(workout.rating)}${'☆'.repeat(5 - workout.rating)}</p>
            <ul>
                ${workout.exercises.map(exercise => `
                    <li>${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight}</li>
                `).join('')}
            </ul>
        `;
        workoutHistoryContainer.appendChild(workoutElement);
    });
}
