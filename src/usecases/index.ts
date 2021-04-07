import { logger } from '@/middlewares/Logger';

export abstract class Usecase {
  constructor() {
    this.logCreated();
  }

  logCreated = (): void => {
    logger.debug(`Created ${this.constructor.name}.`);
  };
}

export abstract class SetDefault {}
