// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const vitalsRoutes = require('./src/routes/vitalsRoutes');

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Use the vitals routes
app.use('/api', vitalsRoutes);

// Test route to check if the server is running
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Global Error Handler (after all your routes and middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  });
  
  const mongoose = require('mongoose');

// MongoDB connection string (replace with your MongoDB URL)
mongoose.connect('mongodb://localhost:27017/dailyVitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});
