import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token faltante' });

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};

