// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: any; // หรือใช้ type ที่เหมาะสมกว่า เช่น UserType
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user; // กำหนด user ให้กับ req
        next();
    });
};
