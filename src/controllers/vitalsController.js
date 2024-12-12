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

// Create a new vital
const createVital = async (req, res) => {
  const { heartRate, bloodPressure, temperature } = req.body;
  try {
    const newVital = new Vitals({ heartRate, bloodPressure, temperature });
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
    const updatedVital = await Vitals.findByIdAndUpdate(id, updates, { new: true });
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
    const deletedVital = await Vitals.findByIdAndDelete(id);
    if (!deletedVital) return res.status(404).json({ error: 'Vital not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vital' });
  }
};

// Get health tips based on vitals
const getHealthTips = async (req, res) => {
  try {
    // Fetch the most recent vital data
    const latestVital = await Vitals.findOne().sort({ _id: -1 });

    if (!latestVital) {
      return res.status(200).json({ tips: ['No vitals data available to generate health tips.'] });
    }

    console.log('Latest Vital Data:', latestVital); // Debugging log

    const { heartRate, bloodPressure, temperature } = latestVital;
    const tips = [];

    // Generate health tips dynamically
    if (heartRate > 100) {
      tips.push('Your heart rate is high. Consider reducing stress and engaging in regular exercise.');
    } else if (heartRate < 60) {
      tips.push('Your heart rate is low. Consult your doctor if you feel fatigued or dizzy.');
    } else {
      tips.push('Your heart rate is normal. Keep up the good work!');
    }

    if (bloodPressure > 140) {
      tips.push('Your blood pressure seems high. Avoid salty foods and manage stress.');
    } else if (bloodPressure < 90) {
      tips.push('Low blood pressure detected. Stay hydrated and eat balanced meals.');
    } else {
      tips.push('Your blood pressure is within a healthy range.');
    }

    if (temperature > 99.5) {
      tips.push('You have a fever. Rest and stay hydrated.');
    } else if (temperature < 97.0) {
      tips.push('Your temperature is low. Keep warm and monitor your health.');
    } else {
      tips.push('Your body temperature is normal.');
    }

    res.status(200).json({ tips });
  } catch (error) {
    console.error('Error generating health tips:', error); // Log any errors
    res.status(500).json({ error: 'Failed to generate health tips' });
  }
};

module.exports = {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
  getHealthTips,
};
