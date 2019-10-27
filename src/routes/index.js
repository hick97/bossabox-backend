import express from 'express';

/* 
  CONTROLLERS
*/
import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
// import ToolsController from '../app/controllers/ToolsController';

const routes = express.Router();

/* USER */

routes.post('/user', UserController.store);

/* SESSION */

routes.post('/session', SessionController.store);

export default routes;
