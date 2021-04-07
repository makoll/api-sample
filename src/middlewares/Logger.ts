import { configure, getLogger, Logger } from 'log4js';

configure('log4js.json');

const logMode = process.env.LOG_MODE;
export const logger: Logger = getLogger(logMode);
