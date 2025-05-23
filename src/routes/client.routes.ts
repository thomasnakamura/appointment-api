import { Router } from 'express';
import { createClient, getClient, updateClient, deleteClient } from '../controllers/client.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateClientSchema, UpdateClientSchema } from '../schemas/client.schema';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post('/', authenticate, validate(CreateClientSchema), createClient);
router.get('/:id', authenticate, getClient);
router.put('/:id', authenticate, validate(UpdateClientSchema), updateClient);
router.delete('/:id', authenticate, deleteClient);

export default router;
