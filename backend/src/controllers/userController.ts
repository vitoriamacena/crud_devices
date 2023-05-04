// src/controllers/userController.ts

import { Request, Response } from 'express';
import { User } from '../models/types';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const createdUser = await userService.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users', error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting user by ID', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser = req.body as Partial<User>;
    const updated = await userService.updateUser(id, updatedUser);

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await userService.deleteUser(id);

    if (deleted) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
 
  }
};
