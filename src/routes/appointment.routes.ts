import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import {
  createAppointment,
  listAppointments,
  updateAppointmentStatus,
  cancelAppointment
} from '../controllers/appointment.controller';
import { CreateAppointmentSchema, UpdateStatusSchema } from '../schemas/appointment.schema';
import { validate } from '../middlewares/validate.middleware';

const router = Router();
router.post('/', authenticate, validate(CreateAppointmentSchema), createAppointment);
router.get('/', authenticate, listAppointments);
router.patch('/:id/status', authenticate,  authorizeRole('specialist', 'admin'), validate(UpdateStatusSchema), updateAppointmentStatus);
router.delete('/:id', authenticate, cancelAppointment);

export default router;
