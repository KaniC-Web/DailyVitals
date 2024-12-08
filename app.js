const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
const vitalsRoutes = require('./src/routes/vitalsRoutes');
require('dotenv').config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Allow requests only from your front-end URL (adjust this as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow certain HTTP methods
}));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dailyVitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// API routes for vitals (imported from vitalsRoutes)
app.use('/api', vitalsRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Vitals API!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
