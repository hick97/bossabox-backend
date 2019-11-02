import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import databaseConfig from './config/database';
import sentryConfig from './config/sentry';
import routes from './routes';

class App {
  constructor() {
    this.express = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.database();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
    this.express.use(cors());
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.express.use(routes);
    this.express.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().express;
