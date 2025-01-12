import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoDB from './config/db'
import authRouter from './routes/authRoutes'
import morgan from 'morgan';

mongoDB()
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

app.use('/api/auth',authRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
