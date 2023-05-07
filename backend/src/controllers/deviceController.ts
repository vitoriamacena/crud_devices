import { Request, Response } from 'express';
import { ElectronicDevice } from '../models/types';
import * as deviceService from '../services/deviceService';

export const createDevice = async (req: Request, res: Response) => {
  try {
    const newDevice = req.body as ElectronicDevice;
    const createdDevice = await deviceService.createDevice(newDevice);
    res.status(201).json(createdDevice);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar dispositivo.', error });
  }
};

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const allDevices = await deviceService.getAllDevices();
    res.status(200).json(allDevices);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dispositivos.', error });
  }
};

export const getDeviceById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const device = await deviceService.getDeviceById(id);

    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dispositivo.', error });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedDevice = req.body as Partial<ElectronicDevice>;
    const updated = await deviceService.updateDevice(id, updatedDevice);

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar dispositivo.', error });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await deviceService.deleteDevice(id);

    if (deleted) {
      res.status(200).json({ message: 'Dispositivo deletado.' });
    } else {
      res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar dispositivo.', error });
 
  }
};
