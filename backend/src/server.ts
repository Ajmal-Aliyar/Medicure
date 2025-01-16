import doctorRoute from './routes/doctorRoutes'
import authRouter from './routes/authRoutes'
import cookieParser from 'cookie-parser';
import mongoDB from './config/db'
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware';

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

app.use('/api/auth', authRouter)
app.use('/api/doctor', doctorRoute)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
