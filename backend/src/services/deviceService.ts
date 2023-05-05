import { ElectronicDevice } from '../models/types';
import devices from '../models/mock_data/eletronic_devices.json';
import { v4 as uuidv4 } from 'uuid';

export const createDevice = async (device: ElectronicDevice): Promise<ElectronicDevice> => {
  const newId = uuidv4();
  const newDevice = { ...device, id: newId };
  devices.push(newDevice);
  return newDevice;
};

export const getAllDevices = async (): Promise<ElectronicDevice[]> => {
  return devices as ElectronicDevice[];
};

export const getDeviceById = async (id: string): Promise<ElectronicDevice | undefined> => {
  return (devices as ElectronicDevice[]).find((device) => device.id === id);
};

export const updateDevice = async (id: string, updatedDevice: Partial<ElectronicDevice>): Promise<ElectronicDevice | undefined> => {
    const deviceIndex = (devices as ElectronicDevice[]).findIndex((device) => device.id === id);
    if (deviceIndex === -1) {
      return undefined;
    }
  
    const deviceToUpdate = devices[deviceIndex];
    const updated = { ...deviceToUpdate, ...updatedDevice } as ElectronicDevice;
    devices[deviceIndex] = updated;
    return updated;
};

export const deleteDevice = async (id: string): Promise<boolean> => {
    const deviceIndex = (devices as ElectronicDevice[]).findIndex((device) => device.id === id);
    if (deviceIndex === -1) {
      return false;
    }
  
    devices.splice(deviceIndex, 1);
    return true;
};