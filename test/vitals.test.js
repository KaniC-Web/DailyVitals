const request = require('supertest');
const app = require('../server'); // Import your server file
describe('Vitals API', () => {
    // Test for creating a vital
    it('should create a new vital', async () => {
      const newVital = {
        heartRate: 72,
        bloodPressure: 120,
        temperature: 98.6,
      };
      const response = await request(app)
      .post('/api/vitals') // API endpoint for creating a vital
      .send(newVital); // Send data as request body