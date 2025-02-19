import { Request, Response, NextFunction } from 'express';

export const isUser = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const client = req.client as { role?: string };
        
        if (!client || client.role !== 'user') {
            res.status(403).json({ message: 'Unauthorized Access' });
        }

        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
