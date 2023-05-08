import request from "supertest";
import app from "../../src/app";
import * as deviceService from "../../src/services/deviceService";
import { NewElectronicDevice } from "../../src/models/types";

jest.mock("../../src/services/deviceService");

const testDeviceId = "1";
const testDevice: NewElectronicDevice = {
  name: "Camera inteligente",
  serial: 123456,
  macAddress: "AA:BB:CC:11:22:33",
  type: "Câmera",
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Device Routes", () => {
  
  it("should get all devices", async () => {
    const devices = [testDevice];
    (deviceService.getAllDevices as jest.Mock).mockResolvedValue(devices);

    const response = await request(app).get("/devices");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(devices);
  });

  it("should create a new device", async () => {
    (deviceService.createDevice as jest.Mock).mockResolvedValue(testDevice);

    const response = await request(app).post("/devices/add").send(testDevice);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(testDevice);
  });

  it("should get device by ID", async () => {
    (deviceService.getDeviceById as jest.Mock).mockResolvedValue(testDevice);

    const response = await request(app).get(`/devices/${testDeviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testDevice);
  });

  it("should update a device", async () => {
    const deviceToUpdate = { ...testDevice, name: "Updated Device" };
    (deviceService.updateDevice as jest.Mock).mockResolvedValue(deviceToUpdate);

    const response = await request(app)
      .put(`/devices/edit/${testDeviceId}`)
      .send(deviceToUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deviceToUpdate);
  });

  it("should delete a device", async () => {
    (deviceService.deleteDevice as jest.Mock).mockResolvedValue(testDeviceId);

    const response = await request(app).delete(`/devices/${testDeviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Dispositivo deletado." });
  });
});
