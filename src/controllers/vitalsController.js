// src/controllers/vitalsController.js
const Vitals = require('../models/vitalsModel');
const Joi = require('joi');

// Validation schema using Joi
const vitalSchema = Joi.object({
  id: Joi.string().required(),
  heartRate: Joi.number().min(40).max(180).required(),
  bloodPressure: Joi.string().required(),
  temperature: Joi.number().min(95).max(105).required(),
});

// Create a new vital
const createVital = async (req, res) => {
  try {
    // Validate incoming data using Joi
    const { error } = vitalSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new Vital document
    const newVital = new Vitals({
      id: req.body.id,
      heartRate: req.body.heartRate,
      bloodPressure: req.body.bloodPressure,
      temperature: req.body.temperature,
    });

    // Save the vital to the database
    const savedVital = await newVital.save();
    res.status(201).json(savedVital);  // Respond with the saved data
  } catch (error) {
    console.error('Error creating vital:', error);
    res.status(500).json({ message: 'Error creating vital', error: error.message });
  }
};

// Get all vitals
const getVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find();  // Fetch all vitals from MongoDB
    res.status(200).json(vitals);  // Return vitals
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ message: 'Error fetching vitals', error: error.message });
  }
};

// Get vital by ID
const getVitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const vital = await Vitals.findOne({ id });  // Find a specific vital by ID
    if (!vital) {
      return res.status(404).json({ message: 'Vital not found' });
    }
    res.status(200).json(vital);  // Return the found vital
  } catch (error) {
    console.error('Error fetching vital:', error);
    res.status(500).json({ message: 'Error fetching vital', error: error.message });
  }
};

// Update vital
const updateVital = async (req, res) => {
  const { id } = req.params;
  const { heartRate, bloodPressure, temperature } = req.body;
  try {
    const vital = await Vitals.findOne({ id });
    if (!vital) {
      return res.status(404).json({ message: 'Vital not found' });
    }

    // Update the vital fields
    vital.heartRate = heartRate || vital.heartRate;
    vital.bloodPressure = bloodPressure || vital.bloodPressure;
    vital.temperature = temperature || vital.temperature;

    // Save updated vital
    const updatedVital = await vital.save();
    res.status(200).json(updatedVital);  // Return updated data
  } catch (error) {
    console.error('Error updating vital:', error);
    res.status(500).json({ message: 'Error updating vital', error: error.message });
  }
};

// Delete vital
const deleteVital = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Vitals.deleteOne({ id });  // Delete the vital by ID
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Vital not found' });
    }
    res.status(204).send();  // Successfully deleted
  } catch (error) {
    console.error('Error deleting vital:', error);
    res.status(500).json({ message: 'Error deleting vital', error: error.message });
  }
};

// Export controller functions
module.exports = { createVital, getVitals, getVitalById, updateVital, deleteVital };
