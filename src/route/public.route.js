import express from 'express';
import userController from '../user/user.controller.js';
import jurnalController from '../jurnal/jurnal.controller.js';

const publicRoute = new express.Router();

publicRoute.post('/api/users', userController.register);
publicRoute.post('/api/users/login', userController.login);
publicRoute.post('/getscopus', jurnalController.getAllScopus);
publicRoute.post('/getpenelitian', jurnalController.getAllPenelitian);
export default publicRoute;
