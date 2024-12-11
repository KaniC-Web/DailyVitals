const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose'); // Import mongoose to close connection

describe('Vitals API Endpoints', () => {
  it('should create a new vital', async () => {
    const newVital = {
      heartRate: 72,
      bloodPressure: 120,
      temperature: 98.6,
    };

    const response = await request(app)
      .post('/api/vitals')
      .send(newVital);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should fetch all vitals', async () => {
    const response = await request(app).get('/api/vitals');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Close MongoDB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
