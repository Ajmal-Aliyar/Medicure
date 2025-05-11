import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const client = req.client as { role?: string };

      if (!client || !client.role || !allowedRoles.includes(client.role)) {
        res.status(403).json({ message: 'Unauthorized Access' });
        return 
      }

      next();
    } catch (error) {
      console.error('Error in role authorization middleware:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
