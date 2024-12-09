const express = require('express');
const router = express.Router();
const {
  getAllVitals,
  createVital,
  deleteVital,
} = require('../controllers/vitalsController'); // Import controller

// Routes for vitals
router.get('/vitals', getAllVitals); // Get all vitals
router.post('/vitals', createVital); // Create a new vital
router.delete('/vitals/:id', deleteVital); // Delete a vital by ID

module.exports = router;
