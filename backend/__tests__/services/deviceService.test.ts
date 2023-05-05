import * as deviceService from '../../src/services/deviceService';
import devices from '../../src/models/mock_data/eletronic_devices.json';

describe('Device Service', () => {
  test('should get device by ID', async () => {
    const testDeviceId = "1";
    const testDevice = devices.find((device) => device.id === testDeviceId);

    const foundDevice = await deviceService.getDeviceById(testDeviceId);

    expect(foundDevice).toEqual(testDevice);
  });
});