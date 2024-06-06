const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Ensure this port is not blocked or in use by another application

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Sample in-memory data
let workouts = [];

app.get('/api/workouts', (req, res) => {
    res.json(workouts);
});

app.post('/api/workouts', (req, res) => {
    const newWorkout = req.body;
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

app.put('/api/workouts/:id', (req, res) => {
    const { id } = req.params;
    const updatedWorkout = req.body;
    workouts = workouts.map((workout, index) => (index == id ? updatedWorkout : workout));
    res.json(updatedWorkout);
});

app.delete('/api/workouts/:id', (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter((_, index) => index != id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

