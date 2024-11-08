import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    export interface Request {
      user?: any; // You can type this according to your user structure, e.g., `user?: IUser`
    }
  }
}
const JWT_SECRET:any = process.env.JWT_SECRET;

interface JwtPayload {
    id: string;
    email: string;
  }

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.headers['authorization'];
  if (!token) { res.status(401).json({ message: 'Access denied' });return;}

  try {
    const verified = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
