import { User } from '../models/types';
import users from '../models/mock_data/users.json';

export const createUser = async (user: User): Promise<User> => {
    const newId = Math.max(...users.map(user => user.id)) + 1;
    const newUser = { ...user, id: newId };
    users.push(newUser);
    return newUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  return users as User[];
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return (users as User[]).find((user) => user.id === id);
};

export const updateUser = async (id: number, updatedUser: Partial<User>): Promise<User | undefined> => {
    const userIndex = (users as User[]).findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
  
    const userToUpdate = users[userIndex];
    const updated = { ...userToUpdate, ...updatedUser } as User;
    users[userIndex] = updated;
    return updated;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const userIndex = (users as User[]).findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
  
    users.splice(userIndex, 1);
    return true;
};