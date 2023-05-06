import axios from 'axios';
import { ElectronicDevice } from "../types/EletronicDevice";

const api = axios.create({
    baseURL: 'http://localhost:5050',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const fetchDevices = () => {
    return api.get('/devices');
  };
  
  export const fetchDeviceById = (id: string) => {
    return api.get(`/devices/${id}`);
  };
  
  export const createDevice = (data: ElectronicDevice) => {
    return api.post('/devices', data);
  };
  
  export const editDevice = (id: string, data: ElectronicDevice) => {
    return api.put(`/devices/${id}`, data);
  };
  
  export const deleteDevice = (id: string) => {
    return api.delete(`/devices/${id}`);
  };