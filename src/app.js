import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';


const app = express();

app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS

app.use(express.json());// Body parsing middleware
app.use(express.urlencoded({ extended: true }));// Body parsing middleware

app.use(cookieParser()); // Parse Cookie header and populate req.cookies

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }})); // HTTP request logging

app.get('/', (req, res) => {
  logger.info('Hello from Production-API!');

  res.status(200).send('Hello from Production-API!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Production-API is Running!' });
});

app.use('/api/auth', authRoutes);//api/auth/sign-in

export default app;
