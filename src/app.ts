import http from 'http';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { BaseEntity, Connection, createConnection, getConnectionOptions } from 'typeorm';

import { router } from '@/infrastructures/router';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { logError } from '@/middlewares/LogError';
import { logger } from '@/middlewares/Logger';

export class AppServer {
  public app: express.Application;
  public server?: http.Server;
  connection?: Connection;

  constructor() {
    this.app = express();
  }

  init = async (): Promise<void> => {
    const connectionOptions = await getConnectionOptions();
    this.connection = await createConnection(connectionOptions);
    BaseEntity.useConnection(this.connection);

    const origin = [process.env.WEB_HOST ?? ''];
    const corsOptions = {
      origin,
      methods: ['PUT', 'DELETE'],
    };

    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use('/', router);
    this.app.use(logError);
    this.app.use(errorHandler);
  };

  start = (): void => {
    const port = process.env.PORT;
    this.server = this.app.listen({ port }, () => {
      logger.debug(`listening on port ${port}`);
    });
  };

  stop = (): void => {
    this.connection?.close();
    this.server?.close();
  };

  stopForTest = (): void => {
    this.connection?.close();
  };
}
