// src/models/vitalsModel.js

let vitals = [];

// Create a new vital
const createVital = (newVital) => {
  vitals.push(newVital);
  return newVital;
};

// Get all vitals
const getVitals = () => vitals;

// Get a vital by ID
const getVitalById = (id) => vitals.find((vital) => vital.id === id);

module.exports = { createVital, getVitals, getVitalById };
