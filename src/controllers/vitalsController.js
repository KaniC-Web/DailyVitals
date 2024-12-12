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
    // Create a new vital entry
    const newVital = new Vitals({ heartRate, bloodPressure, temperature });
    await newVital.save();

    // Generate health tips for this new vital entry
    const tips = [];
    if (heartRate > 100) {
      tips.push("Your heart rate is high. Consider reducing stress and engaging in regular exercise.");
    } else if (heartRate < 60) {
      tips.push("Your heart rate is low. Consult your doctor if you feel fatigued or dizzy.");
    } else {
      tips.push("Your heart rate is normal. Keep up the good work!");
    }

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

    res.status(201).json({ newVital, tips }); // Return the created vital and the health tips
  } catch (error) {
    res.status(400).json({ error: 'Failed to create vital' });
  }
};

// Update an existing vital by ID
const updateVital = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Update the vital by ID
    const updatedVital = await Vitals.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedVital) return res.status(404).json({ error: 'Vital not found' });

    // Generate health tips for the updated vital entry
    const tips = [];
    if (updatedVital.heartRate > 100) {
      tips.push("Your heart rate is high. Consider reducing stress and engaging in regular exercise.");
    } else if (updatedVital.heartRate < 60) {
      tips.push("Your heart rate is low. Consult your doctor if you feel fatigued or dizzy.");
    } else {
      tips.push("Your heart rate is normal. Keep up the good work!");
    }

    if (updatedVital.bloodPressure) {
      const [systolic, diastolic] = updatedVital.bloodPressure.split('/').map(Number);
      if (systolic > 140 || diastolic > 90) {
        tips.push("Your blood pressure is high. Avoid salty foods and manage stress.");
      } else if (systolic < 90 || diastolic < 60) {
        tips.push("Your blood pressure is low. Stay hydrated and eat balanced meals.");
      } else {
        tips.push("Your blood pressure is within a healthy range. Great job!");
      }
    }

    if (updatedVital.temperature > 99.5) {
      tips.push("You have a fever. Rest and stay hydrated.");
    } else if (updatedVital.temperature < 97.0) {
      tips.push("Your body temperature is low. Keep warm and monitor your health.");
    } else {
      tips.push("Your body temperature is normal.");
    }

    res.status(200).json({ updatedVital, tips }); // Return the updated vital and the health tips
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

// Get health tips based on the most recent vital
const getHealthTips = async (req, res) => {
  try {
    const latestVital = await Vitals.findOne().sort({ _id: -1 }); // Fetch the most recent vital entry

    if (!latestVital) {
      console.log("No vitals data found."); // Debugging: Check if data is missing
      return res.json({ message: "No vitals data available for analysis." });
    }

    console.log("Latest Vital Data fetched:", latestVital); // Log the latest vital

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

    console.log("Generated tips:", tips); // Log the generated tips for debugging

    res.json({ tips });
  } catch (error) {
    console.error("Error generating health tips:", error); // Log any errors
    res.status(500).json({ error: 'Error generating health tips' });
  }
};

module.exports = {
  getAllVitals,
  createVital,
  updateVital,
  deleteVital,
  getHealthTips,
};
