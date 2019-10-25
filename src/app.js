import express from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  database() {
    // TODO: Connect to mongoDB database
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
