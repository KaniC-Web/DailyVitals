// Import required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const vitalsRoutes = require('./src/routes/vitalsRoutes');

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API routes for vitals
app.use('/api', vitalsRoutes);

// Base route to verify server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Vitals API!');
});

// Global Error Handler (handles all uncaught errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
