const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const vitalsRoutes = require('./src/routes/vitalsRoutes');
require('dotenv').config();

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dailyVitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// API routes for vitals
app.use('/api', vitalsRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Vitals API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
