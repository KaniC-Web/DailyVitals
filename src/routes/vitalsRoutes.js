const express = require('express');
const router = express.Router();
const {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
} = require('../controllers/vitalsController'); // Import controller
const Vital = require('../models/vital'); // Import the Vital model

// Routes for vitals
router.get('/vitals', getAllVitals);          // Get all vitals
router.post('/vitals', createVital);         // Create a new vital
router.put('/vitals/:id', updateVital);      // Update a vital by ID
router.delete('/vitals/:id', deleteVital);   // Delete a vital by ID

// Add this route for health tips
router.get('/vitals/health-tips', async (req, res) => {
  try {
    const vitals = await Vital.find();

    if (!vitals.length) {
      return res.json({ tips: ["No health tips available. Add vitals data to receive personalized tips."] });
    }

    const avgHeartRate = vitals.reduce((sum, v) => sum + v.heartRate, 0) / vitals.length;
    const maxBP = Math.max(...vitals.map(v => v.bloodPressure));
    const minBP = Math.min(...vitals.map(v => v.bloodPressure));

    // Basic health tips logic
    const tips = [];
    if (avgHeartRate > 100) {
      tips.push("Your average heart rate is high. Consider regular exercise and reducing stress.");
    } else if (avgHeartRate < 60) {
      tips.push("Your average heart rate is low. Consult your doctor if you feel fatigued or dizzy.");
    } else {
      tips.push("Your heart rate is normal. Keep up the good work!");
    }

    if (maxBP > 140) {
      tips.push("Your blood pressure seems high. Avoid salty foods and manage stress.");
    }

    if (minBP < 90) {
      tips.push("Low blood pressure detected. Stay hydrated and eat balanced meals.");
    } else {
      tips.push("Your blood pressure is in a healthy range. Great job!");
    }

    res.json({ tips });
  } catch (error) {
    res.status(500).json({ tips: ["Error generating health tips. Please try again later."] });
  }
});

module.exports = router;
