const Vitals = require('../models/vitalsModel');

// Get all vitals
const getAllVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find();
    res.status(200).json(vitals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vitals' });
  }
};

// Get a single vital by ID
const getVitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const vital = await Vitals.findOne({ id });
    if (!vital) return res.status(404).json({ error: 'Vital not found' });
    res.status(200).json(vital);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vital' });
  }
};

// Create a new vital
const createVital = async (req, res) => {
  const { id, heartRate, bloodPressure, temperature } = req.body;
  try {
    const newVital = new Vitals({ id, heartRate, bloodPressure, temperature });
    await newVital.save();
    res.status(201).json(newVital);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create vital' });
  }
};

// Update an existing vital by ID
const updateVital = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedVital = await Vitals.findOneAndUpdate({ id }, updates, { new: true });
    if (!updatedVital) return res.status(404).json({ error: 'Vital not found' });
    res.status(200).json(updatedVital);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update vital' });
  }
};

// Delete a vital by ID
const deleteVital = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVital = await Vitals.findOneAndDelete({ id });
    if (!deletedVital) return res.status(404).json({ error: 'Vital not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vital' });
  }
};

module.exports = { getAllVitals, getVitalById, createVital, updateVital, deleteVital };
