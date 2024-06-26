import express from 'express';
import userController from '../user/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import universityController from '../university/university.controller.js';
import prodiController from '../prodi/prodi.controller.js';
import dosenController from '../dosen/dosen.controller.js';

const userRoute = new express.Router();

userRoute.use(authMiddleware);

// User API
userRoute.get('/api/users', userController.get);
userRoute.patch('/api/users', userController.update);
userRoute.delete('/api/users/logout', userController.logout);

// University API
userRoute.post('/api/university', universityController.create);
userRoute.patch('/api/university/:id', universityController.update);
userRoute.delete('/api/university/:id', universityController.destroy);

// Prodi API
userRoute.post('/api/prodi', prodiController.create);
userRoute.patch('/api/prodi/:id', prodiController.update);
userRoute.delete('/api/prodi/:id', prodiController.destroy);

// Dosen API
userRoute.post('/api/dosen', dosenController.create);
userRoute.patch('/api/dosen/:id', dosenController.update);
userRoute.delete('/api/dosen/:id', dosenController.destroy);

export default userRoute;
