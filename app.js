const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
const vitalsRoutes = require('./src/routes/vitalsRoutes');
require('dotenv').config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Allow requests only from your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow certain HTTP methods
}));

// Middleware to parse JSON requests
app.use(cors());  
app.use(bodyParser.json());

// Use routes
app.use('/api/vitals', vitalsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dailyVitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Create a Schema for the vitals
const vitalsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom id field (String)
  heartRate: Number,
  bloodPressure: String,
  temperature: Number,
}, { toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret._id; } } });

const Vital = mongoose.model('Vital', vitalsSchema);

// API Routes for vitals CRUD operations

// Get all vitals
app.get('/api/vitals', async (req, res) => {
  try {
    const vitals = await Vital.find();
    res.json(vitals); // Return all vitals
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving vitals' });
  }
});

// Add a new vital
app.post('/api/vitals', async (req, res) => {
  const { id, heartRate, bloodPressure, temperature } = req.body;

  try {
    const newVital = new Vital({ id, heartRate, bloodPressure, temperature });
    await newVital.save();
    res.status(201).json(newVital); // Return the newly created vital
  } catch (err) {
    res.status(400).json({ message: 'Error adding new vital' });
  }
});

// Update an existing vital
app.put('/api/vitals/:id', async (req, res) => {
  const { id } = req.params;
  const { heartRate, bloodPressure, temperature } = req.body;

  try {
    const updatedVital = await Vital.findOneAndUpdate(
      { id }, // Find the vital by its custom 'id'
      { heartRate, bloodPressure, temperature }, // Update the values
      { new: true } // Return the updated document
    );
    
    if (!updatedVital) {
      return res.status(404).json({ message: 'Vital not found' });
    }

    res.json(updatedVital); // Return the updated vital
  } catch (err) {
    res.status(400).json({ message: 'Error updating vital' });
  }
});

// Delete a vital
app.delete('/api/vitals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVital = await Vital.findOneAndDelete({ id });
    if (!deletedVital) {
      return res.status(404).json({ message: 'Vital not found' });
    }
    res.json({ message: 'Vital deleted' }); // Success message
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vital' });
  }
});

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Vitals API!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
