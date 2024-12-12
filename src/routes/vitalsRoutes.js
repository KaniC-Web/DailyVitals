const express = require('express');
const router = express.Router();
const {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
} = require('../controllers/vitalsController'); // Import controller
const Vitals = require('../models/vitalsModel'); 

// Routes for vitals
router.get('/vitals', getAllVitals);          
router.post('/vitals', createVital);        
router.put('/vitals/:id', updateVital);      
router.delete('/vitals/:id', deleteVital);   

// Add this route for health tips
router.get('/vitals/health-tips', async (req, res) => {
  try {
    const vitals = await Vitals.find();  // Fetch all vitals from the DB

    if (!vitals.length) {
      console.log("No vitals data found."); // Debugging: Check if data is missing
      return res.json({ message: "No vitals data available for analysis." });
    }

    // Log the vitals fetched
    console.log("Vitals data fetched:", vitals);

    // Calculating averages and ranges for health tips
    const avgHeartRate = vitals.reduce((sum, v) => sum + v.heartRate, 0) / vitals.length;
    const maxBP = Math.max(...vitals.map(v => parseInt(v.bloodPressure.split('/')[0]))); 
    const minBP = Math.min(...vitals.map(v => parseInt(v.bloodPressure.split('/')[0]))); 

    console.log("Avg Heart Rate:", avgHeartRate); 
    console.log("Max BP:", maxBP);  
    console.log("Min BP:", minBP); 

    const tips = [];

    // Health tips logic
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

    console.log("Generated tips:", tips); 

    res.json({ tips });
  } catch (error) {
    console.error("Error generating health tips:", error); 
    res.status(500).json({ error: 'Error generating health tips' });
  }
});

module.exports = router;
