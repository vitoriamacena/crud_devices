export interface ElectronicDevice {
  id: string;
  name: string;
  serial: number;
  macAddress: string;
  type: string;
};

export type NewElectronicDevice = Omit<ElectronicDevice, 'id'>;