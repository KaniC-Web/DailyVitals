// In-memory array to store vitals
const vitalsData = [];

// Get all vitals
const getAllVitals = () => {
  return vitalsData;
};

// Get a single vital by ID
const getVitalById = (id) => {
  return vitalsData.find((vital) => vital.id === id);
};

// Create a new vital
const createVital = (newVital) => {
  vitalsData.push(newVital);
  return newVital;
};

// Update a vital by ID
const updateVital = (id, updatedVital) => {
  const index = vitalsData.findIndex((vital) => vital.id === id);
  if (index !== -1) {
    vitalsData[index] = { ...vitalsData[index], ...updatedVital };
    return vitalsData[index];
  }
  return null;
};

// Delete a vital by ID
const deleteVital = (id) => {
  const index = vitalsData.findIndex((vital) => vital.id === id);
  if (index !== -1) {
    return vitalsData.splice(index, 1);
  }
  return null;
};

module.exports = {
  getAllVitals,
  getVitalById,
  createVital,
  updateVital,
  deleteVital,
};
