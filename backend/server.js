import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';

// Models
import ChatMessage from './models/ChatMessage.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { conversationId, senderId, text } = data;
      const newMessage = await ChatMessage.create({
        conversation: conversationId,
        sender: senderId,
        text
      });
      
      io.to(conversationId).emit('receive_message', {
        ...data,
        _id: newMessage._id,
        createdAt: newMessage.createdAt
      });
    } catch (err) {
      console.error('Socket error - failed to save message');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Implementation
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', dataRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('AgriSmart API is running...');
});

// Error handling fallback
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
