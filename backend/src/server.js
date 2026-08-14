import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 8000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Connect to MongoDB using Mongoose
connectDB();

// CORS Middleware setup
const allowedOrigins = CORS_ORIGIN === '*'
  ? '*'
  : CORS_ORIGIN.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is healthy and running' });
});

// API Routes
app.use('/api', blogRoutes);
app.use('/api', articleRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found - ${req.originalUrl}` });
});

// Global Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Express Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});