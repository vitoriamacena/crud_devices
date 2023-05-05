import request from 'supertest';
import app from '../../src/app';
import * as deviceService from '../../src/services/deviceService';

jest.mock('../../src/services/deviceService');

describe('Device Routes', () => {
  test('should get device by ID', async () => {
    const testDeviceId = "1";
    const testDevice = {
      id: testDeviceId,
      name: "Smart Camera A1",
      serial: 123456,
      macAddress: "AA:BB:CC:11:22:33",
      type: "camera"
    };

    (deviceService.getDeviceById as jest.Mock).mockResolvedValue(testDevice);

    const response = await request(app).get(`/devices/device/${testDeviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testDevice);
  });
});
