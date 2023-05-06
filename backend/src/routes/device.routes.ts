import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

export const router = Router();

router.post('/', deviceController.createDevice);
router.get('/', deviceController.getAllDevices);
router.get('/:id', deviceController.getDeviceById);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);
