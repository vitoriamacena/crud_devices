import { Request, Response } from 'express';
import shift_schedules from '../models/mock_data/shift_schedules.json';
import { ShiftSchedule } from '../models/types';

export const createShiftSchedule = async (req: Request, res: Response) => {

};

export const getAllShiftSchedule = async (req: Request, res: Response) => {
  res.json(shift_schedules as ShiftSchedule[]);
};

export const getShiftScheduleById = async (req: Request, res: Response) => {

};

export const updateShiftSchedule = async (req: Request, res: Response) => {

};

export const deleteShiftSchedule = async (req: Request, res: Response) => {

};