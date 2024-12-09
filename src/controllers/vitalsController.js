const Vitals = require('../models/vitalsModel');

// Get all vitals
const getAllVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find(); // Fetch all vitals from database
    res.status(200).json(vitals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vitals' });
  }
};

// Create a new vital
const createVital = async (req, res) => {
  const { heartRate, bloodPressure, temperature } = req.body;
  try {
    const newVital = new Vitals({ heartRate, bloodPressure, temperature });
    await newVital.save(); // Save the new vital to database
    res.status(201).json(newVital); // Respond with the created vital
  } catch (error) {
    res.status(400).json({ error: 'Failed to create vital' });
  }
};

// Update an existing vital by ID
const updateVital = async (req, res) => {
  const { id } = req.params; // Extract ID from the request params
  const updates = req.body; // Get updated fields from request body
  try {
    const updatedVital = await Vitals.findByIdAndUpdate(id, updates, { new: true }); // Update and return the new vital
    if (!updatedVital) return res.status(404).json({ error: 'Vital not found' }); // Handle non-existent vital
    res.status(200).json(updatedVital); // Respond with the updated vital
  } catch (error) {
    res.status(400).json({ error: 'Failed to update vital' });
  }
};

// Delete a vital by ID
const deleteVital = async (req, res) => {
  const { id } = req.params; // Extract ID from the request params
  try {
    const deletedVital = await Vitals.findByIdAndDelete(id); // Delete the vital from the database
    if (!deletedVital) return res.status(404).json({ error: 'Vital not found' }); // Handle non-existent vital
    res.status(204).end(); // Respond with no content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vital' });
  }
};

module.exports = { getAllVitals, createVital, updateVital, deleteVital };
