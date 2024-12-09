const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
}, { timestamps: true });

const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = Vitals;
