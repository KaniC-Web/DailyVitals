const Vitals = require('../models/vitalsModel');

// Generate health tips based on vitals
const generateHealthTips = (vitals) => {
  const tips = [];
  
  if (vitals.heartRate > 100) {
    tips.push("Your heart rate is high. Consider reducing stress and engaging in regular exercise.");
  } else if (vitals.heartRate < 60) {
    tips.push("Your average heart rate is low. Consult your doctor if you feel fatigued or dizzy.");
  }

  if (vitals.bloodPressure > 140) {
    tips.push("Your blood pressure seems high. Avoid salty foods and manage stress.");
  } else if (vitals.bloodPressure < 90) {
    tips.push("Low blood pressure detected. Stay hydrated and eat balanced meals.");
  }

  if (vitals.temperature > 99.5) {
    tips.push("You have a fever. Rest and stay hydrated.");
  } else if (vitals.temperature < 97.0) {
    tips.push("Your temperature is low. Keep warm and monitor your health.");
  }

  return tips;
};

// Get health tips
const getHealthTips = async (req, res) => {
  try {
    const vitals = await Vitals.find().sort({ createdAt: -1 }).limit(1); // Fetch the latest vitals entry
    if (vitals.length === 0) {
      return res.status(200).json({ tips: ["No vitals data available to generate tips."] });
    }
    const tips = generateHealthTips(vitals[0]);
    res.status(200).json({ tips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health tips' });
  }
};

module.exports = { getAllVitals, createVital, updateVital, deleteVital, getHealthTips };