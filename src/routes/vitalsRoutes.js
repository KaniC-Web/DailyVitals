const express = require('express');
const router = express.Router();
const Vital = require('../models/vitalModel');

// Read all vitals
router.get('/vitals', (req, res) => {
  Vital.find()
    .then(vitals => res.json(vitals))
    .catch(error => res.status(500).json({ message: 'Error fetching vitals' }));
});

// Read a specific vital by ID
router.get('/vitals/:id', (req, res) => {
  const { id } = req.params;
  Vital.findById(id)
    .then(vital => res.json(vital))
    .catch(error => res.status(404).json({ message: 'Vital not found' }));
});

// Create a new vital entry
router.post('/vitals', (req, res) => {
  const { heartRate, bloodPressure, temperature } = req.body;
  const newVital = new Vital({ heartRate, bloodPressure, temperature });

  newVital.save()
    .then(vital => res.status(201).json(vital))
    .catch(error => res.status(400).json({ message: 'Error adding vital' }));
});

// Update a specific vital entry
router.put('/vitals/:id', (req, res) => {
  const { id } = req.params;
  const { heartRate, bloodPressure, temperature } = req.body;

  Vital.findByIdAndUpdate(id, { heartRate, bloodPressure, temperature }, { new: true })
    .then(updatedVital => res.json(updatedVital))
    .catch(error => res.status(400).json({ message: 'Error updating vital' }));
});

// Delete a specific vital entry
router.delete('/vitals/:id', async (req, res) => {
  const { id } = req.params; // Get the id from the URL

  try {
    // Delete the vital from the database using the 'id' field
    const result = await Vital.findOneAndDelete({ id });

    if (!result) {
      return res.status(404).json({ message: 'Vital not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Vital deleted' });
  } catch (err) {
    console.error('Error deleting vital:', err);
    res.status(500).json({ message: 'Failed to delete vital' });
  }
});

module.exports = router;
