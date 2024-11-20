const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
});

const Vital = mongoose.model('Vital', vitalSchema);

module.exports = Vital;


let vitals = [];

// Create a new vital
const createVital = (newVital) => {
  vitals.push(newVital);
  return newVital;
};

// Get all vitals
const getVitals = () => vitals;

// Get a vital by ID
const getVitalById = (id) => vitals.find((vital) => vital.id === id);

module.exports = { createVital, getVitals, getVitalById };
