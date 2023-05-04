// __tests__/services/userService.test.ts

import * as userService from '../../src/services/userService';
import users from '../../src/models/mock_data/users.json';
import { User } from '../../src/models/types';

describe('User Service', () => {
  test('should get all users', async () => {
    const allUsers = await userService.getAllUsers();
    expect(allUsers).toEqual(users);
  });

  test('should get user by ID', async () => {
    const testUserId = 1;
    const testUser = users.find((user) => user.id === testUserId);

    const foundUser = await userService.getUserById(testUserId);
    expect(foundUser).toEqual(testUser);
  });
});
