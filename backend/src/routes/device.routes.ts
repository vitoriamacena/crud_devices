import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

export const router = Router();

router.post('/', deviceController.createDevice);
router.get('/', deviceController.getAllDevices);
router.get('/device/:id', deviceController.getDeviceById);
router.put('/device/:id', deviceController.updateDevice);
router.delete('/device/:id', deviceController.deleteDevice);
