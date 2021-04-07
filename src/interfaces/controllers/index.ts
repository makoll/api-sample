import { validate } from 'class-validator';

import { Entity } from '@/entities/index';
import { ValidateErrors } from '@/errors/ValidateErrors';
import { logger } from '@/middlewares/Logger';

export abstract class Controller {
  logCalled = (funcName: string): void => {
    logger.debug(`Called ${this.constructor.name}#${funcName}.`);
  };

  validate = async (entities: Entity[]): Promise<void> => {
    const errors = await Promise.all(entities.map((entity) => validate(entity)));
    const errorsFlatten = errors.flat();
    if (errorsFlatten.length) {
      throw new ValidateErrors(errorsFlatten);
    }
  };
}
