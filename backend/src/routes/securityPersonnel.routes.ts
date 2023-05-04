import { Router } from 'express';
import * as securityPersonnel from '../controllers/securityPersonnelController';

export const router = Router();

router.post('/', securityPersonnel.createSecurityPersonnel);
router.get('/', securityPersonnel.getAllSecurityPersonnel);
router.get('/:id', securityPersonnel.getSecurityPersonnelById);
router.put('/:id', securityPersonnel.updateSecurityPersonnel);
router.delete('/:id', securityPersonnel.deleteSecurityPersonnel);
