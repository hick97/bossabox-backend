import express from 'express';

/* CONTROLLERS */

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import ToolsController from '../app/controllers/ToolsController';

/* MIDDLEWARES */

import authMiddleware from '../app/middlewares/auth';

const routes = express.Router();

/* USER */

routes.post('/user', UserController.store);

/* SESSION */

routes.post('/session', SessionController.store);

/* TOOLS */
routes.use(authMiddleware);
routes.post('/tools/store', ToolsController.store);
routes.get('/tools', ToolsController.index);

export default routes;
