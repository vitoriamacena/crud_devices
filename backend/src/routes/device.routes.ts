import { Router } from "express";
import * as deviceController from "../controllers/deviceController";
import { ElectronicDevice } from "../models/types";
import {
  deviceIdSchema,
  electronicDeviceSchema,
} from "../validators/validation";

export const router = Router();

router.get("/", deviceController.getAllDevices);

router.post("/add", async (req, res) => {
  try {
    const deviceData: ElectronicDevice = req.body;

    const validationResult = electronicDeviceSchema.validate(deviceData);

    if (validationResult.error) {
      return res.status(400).json({
        message: "Erro ao criar dispositivo.",
        error: validationResult.error.details,
      });
    }

    await deviceController.createDevice(req, res);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const validationResult = deviceIdSchema.validate({ id });

  if (validationResult.error) {
    return res.status(400).json({
      message: "Erro ao buscar dispositivo.",
      error: validationResult.error.details,
    });
  }

  await deviceController.getDeviceById(req, res);
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const data: ElectronicDevice = req.body;

  const idValidationResult = deviceIdSchema.validate({ id });
  const updateValidationResult = electronicDeviceSchema.validate(data);

  if (idValidationResult.error || updateValidationResult.error) {
    return res.status(400).json({
      message: "Erro ao atualizar dispositivo.",
      error: [
        ...(idValidationResult.error?.details || []),
        ...(updateValidationResult.error?.details || []),
      ],
    });
  }

  await deviceController.updateDevice(req, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const validationResult = deviceIdSchema.validate({ id });

  if (validationResult.error) {
    return res.status(400).json({
      message: "Erro ao deletar dispositivo.",
      error: validationResult.error.details,
    });
  }

  await deviceController.deleteDevice(req, res);
});
