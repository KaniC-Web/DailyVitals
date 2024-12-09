const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true }
});

const Vital = mongoose.model('Vital', vitalSchema);

module.exports = Vital;
