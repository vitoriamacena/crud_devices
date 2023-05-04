import { Router } from 'express';
import * as shiftSchedule from '../controllers/shiftScheduleController';

export const router = Router();

router.post('/', shiftSchedule.createShiftSchedule);
router.get('/', shiftSchedule.getAllShiftSchedule);
router.get('/:id', shiftSchedule.getShiftScheduleById);
router.put('/:id', shiftSchedule.updateShiftSchedule);
router.delete('/:id', shiftSchedule.deleteShiftSchedule);
