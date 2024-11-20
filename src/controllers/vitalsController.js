// src/controllers/vitalsController.js
const Vitals = require('../models/vitalsModel');

// Create a new vital
const createVital = (req, res) => {
  const { id, heartRate, bloodPressure, temperature } = req.body;
  if (!id || !heartRate || !bloodPressure || !temperature) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newVital = { id, heartRate, bloodPressure, temperature };
  const createdVital = Vitals.createVital(newVital);
  return res.status(201).json(createdVital);
};

// Get all vitals
const getVitals = (req, res) => {
  const allVitals = Vitals.getVitals();
  return res.status(200).json(allVitals);
};

// Get vital by ID
const getVitalById = (req, res) => {
  const { id } = req.params;
  const vital = Vitals.getVitalById(id);

  if (!vital) {
    return res.status(404).json({ message: 'Vital not found' });
  }

  return res.status(200).json(vital);
};

// Update vital
const updateVital = (req, res) => {
  const { id } = req.params;
  const { heartRate, bloodPressure, temperature } = req.body;
  const vital = Vitals.getVitalById(id);

  if (!vital) {
    return res.status(404).json({ message: 'Vital not found' });
  }

  vital.heartRate = heartRate || vital.heartRate;
  vital.bloodPressure = bloodPressure || vital.bloodPressure;
  vital.temperature = temperature || vital.temperature;

  return res.status(200).json(vital);
};

// Delete vital
const deleteVital = (req, res) => {
  const { id } = req.params;
  const vitalIndex = Vitals.getVitals().findIndex((v) => v.id === id);

  if (vitalIndex === -1) {
    return res.status(404).json({ message: 'Vital not found' });
  }

  Vitals.getVitals().splice(vitalIndex, 1);
  return res.status(204).send();
};

// Export controller functions
module.exports = { createVital, getVitals, getVitalById, updateVital, deleteVital };
