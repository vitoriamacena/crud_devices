import request from 'supertest';
import app from '../../src/app';
import users from '../../src/models/mock_data/users.json';

describe('User Controller', () => {
  test('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should get user by ID', async () => {
    const testUserId = 1;
    const response = await request(app).get(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: testUserId,
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
    });
  });
});
