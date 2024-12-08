const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: true
  },
  bloodPressure: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Vital', vitalSchema);
