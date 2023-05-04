
import request from 'supertest';
import app from '../src/app';

describe('App', () => {
  test('should return a welcome message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'welcome' });
  });
});