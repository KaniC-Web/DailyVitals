const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const vitalsRoutes = require('./src/routes/vitalsRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Log incoming requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use('/api', (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
}

// API routes for vitals
app.use('/api', vitalsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dailyVitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Vitals API!');
});

// Start the server only when the file is executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app
