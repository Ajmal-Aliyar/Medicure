import { PORT } from './config/env';
import medicalRecordRouter from './routes/medicalRecordRoutes';
import doctorVerifications from './routes/verificationRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import specialization from './routes/specializationRoutes';
import appointmentRouter from './routes/appointmentRoutes';
import transactionRouter from './routes/transactionRoutes';
import testReportRouter from './routes/testReportRoutes';
import feedbackRouter from './routes/feedbackRoutes';
import withdrawRouter from './routes/withdrawRoutes';
import patientRouter from './routes/patientRoutes';
import paymentRouter from './routes/paymentRoutes';
import messageRouter from './routes/messageRoutes';
import doctorRouter from './routes/doctorRoutes';
import walletRouter from './routes/walletRoutes';
import adminRouter from './routes/adminRoutes';
import { socketHandler } from './utils/socket';
import authRouter from './routes/authRoutes';
import slotRouter from "./routes/slotRoutes";
import chatRouter from './routes/chatRoutes';
import cookieParser from 'cookie-parser';
import mongoDB from './config/db';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';

mongoDB()
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));



app.use("/api/webhook", express.raw({ type: "application/json" }), paymentRouter);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());



app.use('/api/doctor/verification', doctorVerifications)
app.use('/api/specialization', specialization)
app.use('/api/appointment', appointmentRouter)
app.use('/api/transaction', transactionRouter)
app.use('/api/record', medicalRecordRouter)
app.use('/api/report', testReportRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/withdraw', withdrawRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/patient', patientRouter)
app.use('/api/message', messageRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/wallet', walletRouter)
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/slot', slotRouter)
app.use('/api/chat', chatRouter)
app.use(errorHandler);


const server = http.createServer(app);
socketHandler(server)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
