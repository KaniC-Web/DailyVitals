const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const vitalsRoutes = require('./src/routes/vitalsRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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

// Route for serving the index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server only when the file is executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app
