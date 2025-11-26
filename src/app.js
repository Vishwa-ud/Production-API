import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';


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

export default app;
