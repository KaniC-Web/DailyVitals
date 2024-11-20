const Joi = require('joi');
const Vitals = require('../models/vitalsModel');

// Validation schema
const vitalSchema = Joi.object({
  id: Joi.string().required(),
  heartRate: Joi.number().required(),
  bloodPressure: Joi.string().required(),
  temperature: Joi.number().required(),
});

// Create a new vital with validation
const createVital = (req, res) => {
  const { error } = vitalSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { id, heartRate, bloodPressure, temperature } = req.body;
  const newVital = { id, heartRate, bloodPressure, temperature };
  const createdVital = Vitals.createVital(newVital);

  return res.status(201).json(createdVital);
};

// Similarly, add validation for other methods (update, etc.)
