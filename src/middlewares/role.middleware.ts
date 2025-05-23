import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ error: 'Acesso não autorizado.' });
      return;
    }

    next();
  };
};
