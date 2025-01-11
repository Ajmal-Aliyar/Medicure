import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoDB from './config/db'
import authRouter from './routes/userRoutes'

dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  }));
  
app.use(express.json());
mongoDB()


app.use('/api/auth',authRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
