export enum DeviceType {
  Camera = "Câmera",
  Sensor = "Sensor",
  ControleRemoto = "Controle Remoto"
}

export type ElectronicDevice = {
    id?: string;
    name: string;
    serial: number;
    macAddress: string;
    type: DeviceType;
  };