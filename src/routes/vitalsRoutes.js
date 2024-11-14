// src/routes/vitalsRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller functions
const { createVital, getVitals, getVitalById, updateVital, deleteVital } = require('../controllers/vitalsController');

// Create Vital - POST
router.post('/vitals', createVital);

// Get all vitals - GET
router.get('/vitals', getVitals);

// Get single vital by ID - GET
router.get('/vitals/:id', getVitalById);

// Update vital - PUT
router.put('/vitals/:id', updateVital);

// Delete vital - DELETE
router.delete('/vitals/:id', deleteVital);

module.exports = router;
