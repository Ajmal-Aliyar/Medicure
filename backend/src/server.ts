import { errorHandler } from './middleware/errorMiddleware';
import doctorRouter from './routes/doctorRoutes'
import doctorVerifications from './routes/verificationRoutes'
import slotRouter from "./routes/slot.routes"
import authRouter from './routes/authRoutes'
import cookieParser from 'cookie-parser';
import mongoDB from './config/db'
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

mongoDB()
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

app.use('/api/doctor/verification', doctorVerifications)
app.use('/api/doctor', doctorRouter)
app.use('/api/auth', authRouter)
app.use('/api/slot', slotRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
