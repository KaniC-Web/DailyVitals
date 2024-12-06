const mongoose = require('mongoose');

// Define the Vitals schema
const vitalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
}, { timestamps: true });

// Create the Vitals model
const Vitals = mongoose.model('Vitals', vitalSchema);

module.exports = Vitals;
