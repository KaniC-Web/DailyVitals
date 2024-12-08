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
router.delete('/vitals/:id', (req, res) => {
  const { id } = req.params;

  Vital.findByIdAndDelete(id)
    .then(() => res.json({ message: 'Vital deleted successfully' }))
    .catch(error => res.status(400).json({ message: 'Error deleting vital' }));
});

module.exports = router;
