import { Router } from 'express';
import { createSpecialist, getSpecialist, updateSpecialist, deleteSpecialist, updateAvailability, getAvailableSlots } from '../controllers/specialist.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateSpecialistSchema, UpdateAvailabilitySchema } from '../schemas/specialist.schema';
import { validate } from '../middlewares/validate.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole('specialist', 'admin'), validate(CreateSpecialistSchema), createSpecialist);

router.get('/available', getAvailableSlots);
router.put('/:id/availability', authenticate, validate(UpdateAvailabilitySchema), updateAvailability);

router.get('/:id', authenticate, getSpecialist);
router.put('/:id', authenticate, updateSpecialist);
router.delete('/:id', authenticate, authorizeRole('specialist', 'admin'),  deleteSpecialist);

export default router;
