import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY


interface Payload {
    email: string;
    role: string;
}


interface DecodedToken extends JwtPayload {
    email: string;
    role: string;
}


export const generateAccessToken = (payload: Payload): string => {
    console.log(ACCESS_TOKEN_EXPIRY,'extime')
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


