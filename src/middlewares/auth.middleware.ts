import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction): void {

  const token = req.cookies.token;

  if (!token) res.status(401).json({ message: 'No autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

