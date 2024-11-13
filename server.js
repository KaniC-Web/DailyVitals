// Import the express library
const express = require('express');

// Import the healthLogs routes
const healthLogsRoutes = require('./routes/healthLogs'); // Make sure this path is correct

// Initialize the express app
const app = express();

// Middleware to parse JSON data sent to the server
app.use(express.json());

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Daily Vitals Tracker API!');
});

// Use the healthLogs routes for any path starting with /healthlogs
app.use('/healthlogs', healthLogsRoutes);

// Define a port for the server to listen on
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
