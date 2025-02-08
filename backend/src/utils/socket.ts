import { Server } from 'socket.io';

let io;
const room = []

export const socket = (server)  => {
    io = new Server(server, {
      cors: {
        origin: process.env.CORS_URL,
        methods: ['GET', 'POST'],
        credentials: true
      }
    });
    
    io.on('connection', (socket) => {
        console.log('New user connected');
      
        socket.on('offer', (data) => {
          socket.broadcast.emit('offer', data);
        });
      
        socket.on('answer', (data) => {
          socket.broadcast.emit('answer', data);
        });
      
        socket.on('ice-candidate', (data) => {
          socket.broadcast.emit('ice-candidate', data);
        });
      
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
}