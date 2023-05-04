
import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/models/types';

describe('User Routes', () => {
  test('should create a new user', async () => {
    const newUser: Partial<User> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'security personnel',
    };

    const response = await request(app)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });
});