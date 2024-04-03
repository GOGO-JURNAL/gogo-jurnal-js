import express from 'express';
import publicRoute from '../route/public.route.js';
import userRoute from '../route/user.route.js';
import errorMiddleware from '../middleware/error.middleware.js';

const server = express();
server.use(express.json());

server.use(publicRoute);
server.use(userRoute);

server.use(errorMiddleware);

export default server;
