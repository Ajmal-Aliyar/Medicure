import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwtUtil';

interface DecodedToken {
    email: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            client?: {
                email: string;
                role: string;
            };
        }
    }
}
export const tokenMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    try {
        console.log('haai')
        const accessToken = req?.cookies?.accessToken ?? null;
        const refreshToken = req?.cookies?.refreshToken ?? null;
        console.log(accessToken,refreshToken,'tokens')
        if (!accessToken && !refreshToken) {
            console.log('No tokens provided');
            return res.status(401).send('Access denied, no token provided');
        }

        if (accessToken) {
            try {
                const decoded = verifyAccessToken(accessToken);
                req.client = decoded;
                return next();
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log('Access token expired, checking refresh token...');
                } else {
                    console.error('Invalid access token:', error);
                    return res.status(403).send('Invalid access token');
                }
            }
        }

        if (refreshToken) {
            try {
                const refreshDecoded = verifyRefreshToken(refreshToken);
                const { email, role } = refreshDecoded;
                const newAccessToken = generateAccessToken({ email, role });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: false,
                    maxAge: 15 * 60 * 1000, 
                    secure: process.env.NODE_ENV === 'production',
                });
                req.client = refreshDecoded;
                return next();
            } catch (error) {
                console.error('Refresh token error:', error);
                return res.status(403).send('Invalid or expired refresh token');
            }
        }
        return res.status(401).send('Authentication failed');
        
    } catch (error) {
        console.error('Unexpected error in tokenMiddleware:', error);
        return res.status(500).send('Internal server error');
    }
};
