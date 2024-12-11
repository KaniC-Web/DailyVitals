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

    expect(response.status).toBe(201); // Expect HTTP 201 Created
    expect(response.body).toHaveProperty('_id'); // Check if response contains _id
    expect(response.body.heartRate).toBe(newVital.heartRate); // Validate heartRate
    expect(response.body.bloodPressure).toBe(newVital.bloodPressure); // Validate bloodPressure
    expect(response.body.temperature).toBe(newVital.temperature); // Validate temperature
  });

  // Test for fetching vitals
  it('should fetch all vitals', async () => {
    const response = await request(app).get('/api/vitals'); // API endpoint for fetching all vitals
    expect(response.status).toBe(200); // Expect HTTP 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Validate response is an array
  });
});