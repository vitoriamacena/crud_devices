import Joi from 'joi';

export const electronicDeviceSchema = Joi.object({
  name: Joi.string().required(),
  serial: Joi.number().required(),
  macAddress: Joi.string().required(),
  type: Joi.string().valid('Câmera', 'Sensor', 'Controle Remoto').required(),
});

export const deviceIdSchema = Joi.object({
  id: Joi.string().required(),
});