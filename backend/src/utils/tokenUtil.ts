
import jwt from 'jsonwebtoken';

interface Payload {
    _id: string;
    role: string;
    isApproved?: boolean;
}


export const generateAccessToken = (payload: Payload): string => {
    console.log(process.env.ACCESS_TOKEN_EXPIRY,'extime')
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {  expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};


export const generateRefreshToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};


export const verifyAccessToken = (token: string): Payload => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as Payload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired access token');
    }
};


export const verifyRefreshToken = (token: string): Payload => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as Payload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};


export const refreshAccessToken = (refreshToken: string): string => {
    const decoded = verifyRefreshToken(refreshToken);
    const payload = { _id: decoded._id, role: decoded.role };
    return generateAccessToken(payload);
};


