import express from 'express';
import userController from '../user/user.controller.js';
import universityController from '../university/university.controller.js';
import prodiController from '../prodi/prodi.controller.js';
import dosenController from '../dosen/dosen.controller.js';
import risetController from '../riset/riset.controller.js';

const publicRoute = new express.Router();

publicRoute.post('/api/users', userController.register);
publicRoute.post('/api/users/login', userController.login);

publicRoute.post('/api/university', universityController.create);
publicRoute.get('/api/university', universityController.getAll);
publicRoute.get('/api/university/:id', universityController.get);
publicRoute.patch('/api/university/:id', universityController.update);
publicRoute.delete('/api/university/:id', universityController.destroy);

publicRoute.post('/api/prodi', prodiController.create);
publicRoute.get('/api/prodi', prodiController.getAll);
publicRoute.get('/api/prodi/:id', prodiController.get);
publicRoute.patch('/api/prodi/:id', prodiController.update);
publicRoute.delete('/api/prodi/:id', prodiController.destroy);

publicRoute.post('/api/dosen', dosenController.create);
publicRoute.get('/api/dosen', dosenController.getAll);
publicRoute.get('/api/dosen/:id', dosenController.get);
publicRoute.patch('/api/dosen/:id', dosenController.update);
publicRoute.delete('/api/dosen/:id', dosenController.destroy);

publicRoute.post('/api/riset', risetController.create);
publicRoute.get('/api/riset', risetController.getAll);

export default publicRoute;
