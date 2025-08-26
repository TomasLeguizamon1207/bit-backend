import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors'; 
import connectDB from './config/db.js';
import flightsRouter from './routers/flights.js';
import authRouter from './routers/auth.js';
import usersRouter from './routers/users.js';

const server = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

connectDB();

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

server.use(express.json());
server.use(morgan('dev'));

server.use('/auth', authRouter);
server.use('/flights', flightsRouter);
server.use('/users', usersRouter);

server.listen(port, () => {
  console.log(` Server running at ${host}:${port}`);
});
