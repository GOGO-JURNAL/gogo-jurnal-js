import express from 'express';
import userController from '../user/user.controller.js';
import prodiController from '../prodi/prodi.controller.js';
import dosenController from '../dosen/dosen.controller.js';
import journalController from '../journal/journal.controller.js';

const publicRoute = new express.Router();

// User API
publicRoute.post('/api/users', userController.register);
publicRoute.post('/api/users/login', userController.login);

// Journal API
publicRoute.post('/api/journal', journalController.create);
publicRoute.get('/api/journal', journalController.getAll);

export default publicRoute;
