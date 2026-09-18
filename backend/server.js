import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import express from 'express';
import http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import customBoardRoutes from './routes/customBoard.js';


const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());


const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://arehman1632:E7hPfX0mp65uR65r@cluster0.uuxrj.mongodb.net/CRM";

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/boards', customBoardRoutes);

app.get('/', (req, res) => res.send('Video Call API is running'));

const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] }
});

const onlineUsers = new Map();

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No auth token provided'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret_12345');
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Invalid or expired token'));
  }
});

function broadcastOnlineUsers() {
  io.emit('online-users', Array.from(onlineUsers.keys()));
}

io.on('connection', (socket) => {
  const userId = socket.userId;
  onlineUsers.set(userId, socket.id);
  console.log(`User connected: ${userId} (${socket.id})`);
  broadcastOnlineUsers();


  socket.on('call-user', ({ to, offer, from }) => {
    const targetSocketId = onlineUsers.get(to);
    if (!targetSocketId) {
      socket.emit('call-error', { message: 'User is offline' });
      return;
    }
    io.to(targetSocketId).emit('incoming-call', { from, offer });
  });


  socket.on('answer-call', ({ to, answer }) => {
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('call-accepted', { answer });
    }
  });

 
  socket.on('reject-call', ({ to }) => {
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('call-rejected');
    }
  });


  socket.on('ice-candidate', ({ to, candidate }) => {
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('ice-candidate', { candidate });
    }
  });


  socket.on('end-call', ({ to }) => {
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('call-ended');
    }
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(userId);
    console.log(`User disconnected: ${userId}`);
    broadcastOnlineUsers();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
