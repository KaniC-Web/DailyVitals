const express = require('express');
const router = express.Router();
const {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
} = require('../controllers/vitalsController'); // Import controller

// Routes for vitals
router.get('/vitals', getAllVitals);          // Get all vitals
router.post('/vitals', createVital);         // Create a new vital
router.put('/vitals/:id', updateVital);      // Update a vital by ID
router.delete('/vitals/:id', deleteVital);   // Delete a vital by ID

module.exports = router;

// Add this route in vitalsRoutes.js
router.get('/vitals/health-tips', async (req, res) => {
  try {
    const vitals = await Vital.find();

    if (!vitals.length) {
      return res.json({ message: "No vitals data available for analysis." });
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
    res.status(500).json({ error: 'Error generating health tips' });
  }
});

