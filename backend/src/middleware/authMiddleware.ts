import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// We extend the default Request type to include our custom userId property
import { Request } from 'express';
export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // "Bearer TOKEN"
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authentication failed. No token provided." });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.userId = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed. Invalid token." });
    }
};