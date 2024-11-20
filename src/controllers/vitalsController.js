// src/controllers/vitalsController.js
const Vitals = require('../models/vitalsModel');
const Joi = require('joi');

// Validation schema
const vitalSchema = Joi.object({
  id: Joi.string().required(),
  heartRate: Joi.number().min(40).max(180).required(),
  bloodPressure: Joi.string().required(),
  temperature: Joi.number().min(95).max(105).required(),
});

// Create a new vital
const createVital = async (req, res) => {
  try {
    const vital = new Vital(req.body);
    const savedVital = await vital.save();
    res.status(201).json(savedVital);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vital', error });
  }
};

// Get all vitals
const getVitals = async (req, res) => {
  try {
    const vitals = await Vital.find();
    res.status(200).json(vitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vitals', error });
  }
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
