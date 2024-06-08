# Muscle Mission

## Overview 

The Muscle Mission application is a user-friendly single-page application (SPA) designed to help fitness enthusiasts manage and track their workout routines efficiently. Built with HTML, CSS, and JavaScript, this app offers features such as exercise selection, workout timing, and progress rating. It leverages localStorage for client-side data persistence, ensuring users can save and review their workout history over time. On the server side, it uses a Node.js server with an in-memory storage mechanism for handling workout data. The application is fully responsive, providing a seamless experience across both desktop and mobile devices.

### Version Control
GitHub was used for version control to manage and track changes throughout the development of the Gym Application, ensuring collaborative efficiency and version history, as seen in the GitHub repository - https://github.com/Yomal-W/Gym-Application. Additionally, Git Bash was used to add, commit and push. 

## Features 
- **Workout Timer:** The application includes a workout timer that users can start, stop, and reset to track the duration of their workouts.
- **Workout Rating:** Users can rate their workout sessions using a star rating system, providing a way to evaluate and improve future workouts.
- **Exercise Management:** Users can add, edit, and remove exercises from their workout routine. Each exercise can have multiple sets with specific weights and repetitions.
- **Dynamic Exercise List:** The exercise list is dynamically rendered based on user input, allowing for a customizable and flexible workout plan.
- **Workout History:** The application saves workout history, displaying past workout sessions with details such as title, time, average weight, date, rating, and exercises performed.
- **Data Persistence:** The application uses localStorage to save workout data, ensuring that user information is retained even after refreshing the page or closing and reopening the browser.
- **Responsive Design:** The application is designed to be responsive, providing an optimal user experience on both desktop and mobile devices.
- **Node.js Server:** A Node.js server handles API requests for adding, updating, and deleting workouts, allowing for scalable and efficient data management.

## Setup
- You will need to have node.js installed on your computer. Here is the link if you need it (https://nodejs.org/en)

## Usage 
1. Extract the contents of the provided ZIP file to a directory on your computer
2. Open up command prompt or another terminal of your option 
3. Navigate to the root directory of the extracted project files. Make sure you are in the correct directory and that package.json file exists. Example directory: cd C:/Users/YourUsername/Downloads/Gym-Application 
4. Run this command (this download includes Express.js package and others): npm install
5. Once everything is installed, run this command: node server.js
6. The server should be running now. You can access it by opening your web browser and pasting this link in there: http://localhost:3000 
7. Use the navigation buttons to access different sections (Home, Workout, History). Add exercises, track your workout time, rate your workouts, and view your workout history.

## Limitations 
This application uses localStorage for data persistence, which is limited to the specific browser and device.
- If you open the application in a different browser or on a different device, you won't see the same workout history and settings.
- localStorage has a storage limit (typically around 5MB), which might be insufficient for storing extensive workout data over a long period.
- Data stored in localStorage can be cleared by the user or by the browser's clearing history and cookies, resulting in the loss of saved workout information.
- This application is primarily designed for personal use and does not support multi-user functionality or synchronization across multiple devices.

## Ackowledgments
### Sources
- https://unsplash.com/
- https://fonts.google.com/
- https://fontjoy.com/
- https://nodejs.org/en
- https://icons8.com/icons/set/gym

### AI ackowledgments
#### script.js
- **Line 6:** //Acknowledgement of ChatGPT - Prompt: In JavaScript, how can I store and retrieve an array of objects from local storage?
- **Line 30:** //Acknowledgement of ChatGPT - Prompt: Process of creating a star rating system with JavaScript
- **Line 38:** //Acknowledgement of ChatGPT - Prompt: I am having trouble changing the colour of the stars when they are clicked. How can I fix this?
- **Line 66:** //Acknowledgement of ChatGPT - Prompt: I have made an exercise array. What is the process of writing JavaScript where a function renders dynamically based on the exercises array.
- **Line 123:** //Acknowledgement of ChatGPT - Prompt: How can I calculate the average value of an array of objects in JavaScript?
#### server.js 
- **Line 9:** //Acknowledgement of ChatGPT - Prompt: I have researched something about middleware in Express.js. How does it serve static files and parse JSON? Additionally, how can I create it?
- **Line 24:** //Acknowledgement of ChatGPT - Prompt: How can I set up an Express.js endpoint using its ID to update an item in js?
- **Line 31:** //Acknowledgement of ChatGPT - Prompt: In order to remove an item by its ID in Express.js, how do I create a delete endpoint?