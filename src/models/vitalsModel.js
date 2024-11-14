// src/models/vitalsModel.js

let vitals = [];

const createVital = (newVital) => {
  vitals.push(newVital);
  return newVital;
};

const getVitals = () => {
  return vitals;
};

const getVitalById = (id) => {
  return vitals.find((vital) => vital.id)
}
