import doctorVerifications from './routes/verificationRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import specialization from './routes/specializationRoutes';
import patientRouter from './routes/patientRoutes';
import doctorRouter from './routes/doctorRoutes';
import adminRouter from './routes/adminRoutes';
import authRouter from './routes/authRoutes';
import slotRouter from "./routes/slotRoutes";
import cookieParser from 'cookie-parser';
import mongoDB from './config/db';
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
app.use('/api/specialization', specialization)
app.use('/api/patient', patientRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/slot', slotRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
