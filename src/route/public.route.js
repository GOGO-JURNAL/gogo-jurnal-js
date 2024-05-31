import express from 'express';
import userController from '../user/user.controller.js';
import prodiController from '../prodi/prodi.controller.js';
import dosenController from '../dosen/dosen.controller.js';
import journalController from '../journal/journal.controller.js';
import universityController from '../university/university.controller.js';

const publicRoute = new express.Router();

// User API
publicRoute.post('/api/users', userController.register);
publicRoute.post('/api/users/login', userController.login);

// University API
publicRoute.get('/api/university', universityController.getAll);
publicRoute.get('/api/university/:id', universityController.get);

// Prodi API
publicRoute.get('/api/prodi', prodiController.getAll);
publicRoute.get('/api/prodi/:id', prodiController.get);

// Prodi API
publicRoute.get('/api/dosen', dosenController.getAll);
publicRoute.get('/api/dosen/:id', dosenController.get);

// Journal API
publicRoute.post('/api/journal', journalController.create);
publicRoute.get('/api/journal', journalController.getAll);

export default publicRoute;
