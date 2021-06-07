import { Router } from 'express';
import multer from 'multer';
import FileController from './app/controllers/FileController';
import ScheduleController from './app/controllers/ScheduleController';
import SessionController from './app/controllers/SessionController';
import UnityController from './app/controllers/UnityController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas não autenticadas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// rota de teste
routes.get('/users', UserController.index);

// Rotas autenticadas
routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users', UserController.update);

routes.get('/schedules', ScheduleController.index);
routes.post('/schedules', ScheduleController.store);
routes.delete('/schedules/:id', ScheduleController.delete);

routes.get('/unity', UnityController.index);

export default routes;
