//Test change for Git
const vitalsModel = require('../models/vitalsModel');

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
const getVitalById = (req, res) => {
  const { id } = req.params;
  try{
    const vital = await Vitals.findOne({ id });
  if (!vital) return res.status(404).json({ error: 'Vital not found' }); 
  res.status(200).json(vital);
    }
    catch (error) {
      res.status(500).json({ error: 'Failed to fetch vital' });
    }
  };
  
// Create a new vital
const createVital = (req, res) => {
  const { id, heartRate, bloodPressure, temperature } = req.body;
  const newVital = { id, heartRate, bloodPressure, temperature };
  const createdVital = vitalsModel.createVital(newVital);
  res.status(201).json(createdVital);
};

// Update a vital by ID
const updateVital = (req, res) => {
  const { id } = req.params;
  const updatedVital = req.body;
  const vital = vitalsModel.updateVital(id, updatedVital);
  if (!vital) {
    return res.status(404).json({ message: 'Vital not found' });
  }
  res.status(200).json(vital);
};

// Delete a vital by ID
const deleteVital = (req, res) => {
  const { id } = req.params;
  const result = vitalsModel.deleteVital(id);
  if (!result) {
    return res.status(404).json({ message: 'Vital not found' });
  }
  res.status(204).send();
};

module.exports = {
  getVitals,
  getVitalById,
  createVital,
  updateVital,
  deleteVital,
};
