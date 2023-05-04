import { Router } from 'express';
import * as location from '../controllers/locationController';

export const router = Router();

router.post('/', location.createLocation);
router.get('/', location.getAllLocations);
router.get('/:id', location.getLocationById);
router.put('/:id', location.updateLocation);
router.delete('/:id', location.deleteLocation);
