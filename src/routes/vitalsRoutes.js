const express = require('express');
const router = express.Router();
const {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
} = require('../controllers/vitalsController'); 
const Vitals = require('../models/vitalsModel');

// Routes for vitals
router.get('/vitals', getAllVitals); 
router.post('/vitals', createVital); 
router.put('/vitals/:id', updateVital); 
router.delete('/vitals/:id', deleteVital); 

// Health tips route that generates tips based on the most recent vital
router.get('/vitals/health-tips', async (req, res) => {
  try {
    const latestVital = await Vitals.findOne().sort({ _id: -1 }); 

    if (!latestVital) {
      console.log("No vitals data found."); 
      return res.json({ message: "No vitals data available for analysis." });
    }

    console.log("Latest Vital Data fetched:", latestVital); 

    const { heartRate, bloodPressure, temperature } = latestVital;
    const tips = [];

    // Health tips logic based on the latest data
    if (heartRate > 100) {
      tips.push("Your heart rate is high. Consider reducing stress and engaging in regular exercise.");
    } else if (heartRate < 60) {
      tips.push("Your heart rate is low. Consult your doctor if you feel fatigued or dizzy.");
    } else {
      tips.push("Your heart rate is normal. Keep up the good work!");
    }

    // Handle blood pressure, assuming it's stored as 'systolic/diastolic' format
    if (bloodPressure) {
      const [systolic, diastolic] = bloodPressure.split('/').map(Number);
      
      if (systolic > 140 || diastolic > 90) {
        tips.push("Your blood pressure is high. Avoid salty foods and manage stress.");
      } else if (systolic < 90 || diastolic < 60) {
        tips.push("Your blood pressure is low. Stay hydrated and eat balanced meals.");
      } else {
        tips.push("Your blood pressure is within a healthy range. Great job!");
      }
    }

    if (temperature > 99.5) {
      tips.push("You have a fever. Rest and stay hydrated.");
    } else if (temperature < 97.0) {
      tips.push("Your body temperature is low. Keep warm and monitor your health.");
    } else {
      tips.push("Your body temperature is normal.");
    }

    console.log("Generated tips:", tips); 

    res.json({ tips });
  } catch (error) {
    console.error("Error generating health tips:", error); 
    res.status(500).json({ error: 'Error generating health tips' });
  }
});

module.exports = router;
