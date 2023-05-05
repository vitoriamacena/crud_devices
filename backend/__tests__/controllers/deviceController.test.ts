import { getDeviceById } from '../../src/controllers/deviceController';
import * as deviceService from '../../src/services/deviceService';
import mockHttp from '../../src/utils/mockHttp';

jest.mock('../../src/services/deviceService');

describe('Device Controller', () => {
  test('should get device by ID', async () => {
    const testDevice = {
      id: '1',
      name: "Smart Camera A1",
      serial: 123456,
      macAddress: "AA:BB:CC:11:22:33",
      type: "camera"
    };

    (deviceService.getDeviceById as jest.Mock).mockResolvedValue(testDevice);

    const { req, res } = mockHttp({
      method: 'GET',
      url: '/api/device/1',
      params: { id: '1' },
    });

    await getDeviceById(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toMatchObject(testDevice);
  });
});


