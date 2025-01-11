import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_ACCESS_SECRET = 'my-access-secret';
const JWT_REFRESH_SECRET = 'my-refresh-secret';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';


interface Payload {
    email: string;
    role: string;
}


interface DecodedToken extends JwtPayload {
    email: string;
    role: string;
}


export const generateAccessToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};


export const generateRefreshToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};


export const verifyAccessToken = (token: string): DecodedToken => {
    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as DecodedToken;
        return decoded; 
    } catch (error) {
        throw new Error('Invalid or expired access token');
    }
};


export const verifyRefreshToken = (token: string): DecodedToken => {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as DecodedToken;
        return decoded; 
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};


export const refreshAccessToken = (refreshToken: string): string => {
    const decoded = verifyRefreshToken(refreshToken);
    const payload = { email: decoded.email, role: decoded.role }; 
    return generateAccessToken(payload); 
};
