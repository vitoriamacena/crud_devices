import * as deviceService from '../../src/services/deviceService';
import devices from '../../src/models/mock_data/eletronic_devices.json';
import { NewElectronicDevice } from '../../src/models/types';

const testDevice: NewElectronicDevice = {
  name: 'Camera inteligente',
  serial: 123456,
  macAddress: 'AA:BB:CC:11:22:33',
  type: 'camera'
};

describe('Device Service', () => {
  it('should create a new device', async () => {
    const newDevice = await deviceService.createDevice(testDevice);
    expect(newDevice).toHaveProperty('id');
    expect(newDevice).toMatchObject(testDevice);
  });

  it('should get all devices', async () => {
    const allDevices = await deviceService.getAllDevices();
    expect(allDevices).toEqual(devices);
  });

  it('should get device by ID', async () => {
    const id = devices[0].id;
    const device = await deviceService.getDeviceById(id);
    expect(device).toEqual(devices[0]);
  });

  it('should update a device', async () => {
    const id = devices[0].id;
    const updatedDeviceData = { name: 'Updated Device' };
    const updatedDevice = await deviceService.updateDevice(id, updatedDeviceData);
    expect(updatedDevice).toMatchObject({ ...devices[0], ...updatedDeviceData });
  });

  it('should delete a device', async () => {
    const id = devices[0].id;
    const deleteResult = await deviceService.deleteDevice(id);
    expect(deleteResult).toBe(true);

    const deviceAfterDeletion = await deviceService.getDeviceById(id);
    expect(deviceAfterDeletion).toBeUndefined();
  });
});