import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import databaseConfig from './config/database';
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
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
