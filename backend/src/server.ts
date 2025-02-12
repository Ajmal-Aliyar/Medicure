import doctorVerifications from './routes/verificationRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import specialization from './routes/specializationRoutes';
import appointment from './routes/appointmentRoutes';
import patientRouter from './routes/patientRoutes';
import paymentRouter from './routes/paymentRoutes';
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
import http from 'http';
import { Server, Socket } from 'socket.io';


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
app.use('/api/appointment', appointment)
app.use('/api/payment', paymentRouter)
app.use('/api/patient', patientRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/slot', slotRouter)

app.use(errorHandler);


const rooms = []
const connectedCandidates = []
const server = http.createServer(app);
let io = new Server(server, {
  cors: {
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New user connected', socket.id);

  socket.on('create-new-room', (data: {candidateId: string, roomId: string}) => createRoom(data, socket))
  socket.on('join-room',(data: {candidateId: string, roomId: string}) => joinRoom(data, socket))
  socket.on('conn-init', (data:{socketId: string}) => initializeConnectionHandler(data, socket))
  socket.on('conn-signal', (data) => signalingHandler(data, socket))
});

const createRoom = (data: {candidateId: string, roomId: string}, socket: Socket) => {
  const roomId = data.roomId

  const newCandidate = {
    id: data.candidateId,
    socketId: socket.id,
    roomId
  }

  connectedCandidates.push(newCandidate)
  rooms.push({ roomId, connectedCandidates: [newCandidate]})

  socket.join(roomId)
  socket.emit('room-id', {roomId})
  socket.emit('room-update', {candidates: [newCandidate]})
}

const joinRoom = (data: {candidateId: string, roomId: string}, socket: Socket) => {
  const {candidateId, roomId} = data
  const room = rooms.find(room => room.roomId === roomId)
  if (room) {
    const newCandidate = {
      id: candidateId,
      socketId: socket.id,
      roomId
    }

    room.connectedCandidates.push(newCandidate)
    connectedCandidates.push(newCandidate)

    socket.join(roomId)

    room.connectedCandidates.forEach((candidate) => {
      if (candidate.socketId !== socket.id) {
        io.to(candidate.socketId).emit('conn-prepare', {socketId: socket.id})
      }
    })
  }
}

const initializeConnectionHandler = (data: {socketId: string}, socket: Socket) => {
  io.to(data.socketId).emit('conn-init', { socketId: socket.id}) 
}

const signalingHandler = (data, socket: Socket) => {
  console.log('i am conn signal')
  const {socketId, signal} = data
  io.to(socketId).emit('conn-signal', {signal, socketId: socket.id})
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
