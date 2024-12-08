// src/routes/vitalsRoutes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createVital,
  getAllVitals,
  getVitalById,
  updateVital,
  deleteVital,
} = require('../controllers/vitalsController');

// Define routes
router.post('/vitals', createVital); // Create a new vital
router.get('/vitals', getAllVitals); // Get all vitals
router.get('/vitals/:id', getVitalById); // Get a specific vital by ID
router.put('/vitals/:id', updateVital); // Update a specific vital by ID
router.delete('/vitals/:id', deleteVital); // Delete a specific vital by ID

module.exports = router;
