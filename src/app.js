import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import usersRoutes from '#routes/users.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';


const app = express();

app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS

app.use(express.json());// Body parsing middleware
app.use(express.urlencoded({ extended: true }));// Body parsing middleware

app.use(cookieParser()); // Parse Cookie header and populate req.cookies

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }})); // HTTP request logging

app.use(securityMiddleware);

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

app.use('/api/users', usersRoutes);//api/users

app.use((req, res) => { res.status(404).json({ error: 'Route Not Found' }); });

export default app;
