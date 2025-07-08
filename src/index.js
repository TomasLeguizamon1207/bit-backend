import 'dotenv/config';
import connectDB from './config/db.js';
import express from 'express';
import morgan from 'morgan';
import flightsRouter from './routers/flights.js';

const server = express();
const host = process.env.HOST;
const port = process.env.PORT;

connectDB();

server.use(express.json());
server.use(morgan('dev'));
server.use('/flights', flightsRouter);

server.get('/', (req, res) => {
  res.status(204).send();
});

server.listen(port, () => {
  console.log(`Server is running at ${host} on port ${port}`);
});