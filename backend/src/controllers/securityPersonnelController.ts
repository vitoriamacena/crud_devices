import { Request, Response } from 'express';
import security_personnel from '../models/mock_data/security_personnel.json';
import { SecurityPersonnel } from '../models/types';

export const createSecurityPersonnel = async (req: Request, res: Response) => {

};

export const getAllSecurityPersonnel = async (req: Request, res: Response) => {
  res.json(security_personnel as SecurityPersonnel[]);
};

export const getSecurityPersonnelById = async (req: Request, res: Response) => {

};

export const updateSecurityPersonnel = async (req: Request, res: Response) => {

};

export const deleteSecurityPersonnel = async (req: Request, res: Response) => {

};