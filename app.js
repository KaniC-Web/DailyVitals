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
