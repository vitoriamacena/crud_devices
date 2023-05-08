import * as deviceController from "../../src/controllers/deviceController";
import * as deviceService from "../../src/services/deviceService";
import { Request, Response } from "express";
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
  jest.clearAllMocks();
});

describe("Device Controller", () => {
  it("should create a new device", async () => {
    (deviceService.createDevice as jest.Mock).mockResolvedValue(testDevice);

    const req: Partial<Request> = {
      body: testDevice,
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deviceController.createDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(testDevice);
  });

  it("should get all devices", async () => {
    const devices = [testDevice];
    (deviceService.getAllDevices as jest.Mock).mockResolvedValue(devices);

    const req: Partial<Request> = {};

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deviceController.getAllDevices(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should get a device by ID", async () => {
    (deviceService.getDeviceById as jest.Mock).mockResolvedValue(testDevice);

    const req: Partial<Request> = {
      params: { id: testDeviceId },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deviceController.getDeviceById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(testDevice);
  });

  it("should update a device", async () => {
    const deviceToUpdate = {
      ...testDevice,
      name: "Camera inteligente",
    };

    (deviceService.updateDevice as jest.Mock).mockResolvedValue(deviceToUpdate);

    const req: Partial<Request> = {
      params: { id: testDeviceId },
      body: deviceToUpdate,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deviceController.updateDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(testDevice);
  });

  it("should delete a device", async () => {
    (deviceService.deleteDevice as jest.Mock).mockResolvedValue(testDeviceId);

    const req: Partial<Request> = {
      params: { id: testDeviceId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deviceController.deleteDevice(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
