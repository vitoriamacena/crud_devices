import { Request, Response } from 'express';
import locations from '../models/mock_data/locations.json';
import { Location } from '../models/types';

export const createLocation = async (req: Request, res: Response) => {

};

export const getAllLocations = async (req: Request, res: Response) => {
  res.json(locations as Location[]);
};

export const getLocationById = async (req: Request, res: Response) => {

};

export const updateLocation = async (req: Request, res: Response) => {

};

export const deleteLocation = async (req: Request, res: Response) => {

};