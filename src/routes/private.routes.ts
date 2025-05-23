import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({
    message: `Acesso autorizado! Usuário ${req.user?.userId}, role: ${req.user?.role}`
  });
});

export default router;
