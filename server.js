const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Make sure this port is not blocked

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public'))); //Acknowledgement of ChatGPT - Prompt: I have researched something about middleware in Express.js. How does it serve static files and parse JSON? Addtionally how can I create it?
app.use(bodyParser.json());

// Sample in-memory data
let workouts = [];

// Get all workouts
app.get('/api/workouts', (req, res) => {
    res.json(workouts); // Send back the workouts array as JSON
});

// Add a new workout
app.post('/api/workouts', (req, res) => {
    const newWorkout = req.body; // Get the new workout from the request body
    workouts.push(newWorkout); // Add the new workout to the array
    res.status(201).json(newWorkout); // Send back the new workout with status 201 (Created)
});

// Update a workout
app.put('/api/workouts/:id', (req, res) => { //Acknowledgement of ChatGPT - Prompt: How can I set up an Express.js endpoint using its ID to update an item in js?
    const { id } = req.params; // Get the workout ID from the URL
    const updatedWorkout = req.body; // Get the updated workout from the request body
    workouts = workouts.map((workout, index) => (index == id ? updatedWorkout : workout)); // Update the workout in the array
    res.json(updatedWorkout); // Send back the updated workout
});

// Delete a workout
app.delete('/api/workouts/:id', (req, res) => { //Acknowledgement of ChatGPT - Prompt: In order to remove an item by its ID in Express.js, how do I create a delete endpoint?
    const { id } = req.params; // Get the workout ID from the URL
    workouts = workouts.filter((_, index) => index != id); // Remove the workout from the array
    res.status(204).end(); // Send back status 204 (No Content) to indicate success
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); // Log that the server is running
});