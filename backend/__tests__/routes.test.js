const request = require('supertest');
const { app } = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('API routes', () => {
  test('health endpoint returns OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('returns 404 for unknown user', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    const res = await request(app).get('/api/user/unknown-user/repos');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  test('returns 429 with Retry-After when rate limited', async () => {
    const resetIn = 90; // seconds
    const reset = Math.floor(Date.now() / 1000) + resetIn;
    axios.get.mockRejectedValueOnce({
      response: {
        status: 403,
        headers: {
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': String(reset),
        },
      },
    });

    const res = await request(app).get('/api/user/someuser/repos');
    expect(res.status).toBe(429);
    expect(res.body.error).toBe('Rate limit exceeded');
    expect(res.headers['retry-after']).toBeDefined();
  });
});


