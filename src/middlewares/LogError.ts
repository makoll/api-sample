import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { STATUS_CODES } from '@/constants/StatusCode';
import { BadRequestError } from '@/errors/BadRequestError';
import { ConflictError } from '@/errors/ConflictError';
import { ForbiddenError } from '@/errors/ForbiddenError';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ValidateErrors } from '@/errors/ValidateErrors';
import { logger } from '@/middlewares/Logger';

// サーバーログ出力するためのモジュール。middlewareで使用。
export const logError = (err: Error | Array<Error>, req: Request, res: Response, next: NextFunction): void => {
  try {
    logErrorImpl(err, req, res, next);
  } catch (e) {
    logger.error(e.trace);
  }
};

const logErrorImpl = (err: Error | Array<Error>, req: Request, _res: Response, next: NextFunction): void => {
  const isUserError =
    err instanceof BadRequestError ||
    err instanceof ConflictError ||
    err instanceof ForbiddenError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ValidateErrors;

  if (err instanceof Error) {
    loggingError(req, err, isUserError);
  }
  next(err);
};

const loggingError = (req: Request, err: Error, isDebug: boolean): void => {
  const message = getErrorMsg(req, err);
  isDebug ? logger.info(message) : logger.error(message);
};

const getErrorMsg = (req: Request, err: Error): string => {
  const commonErrMsg = `[Access URL]: ${req.method} ${req.url}
    [Request Parameter]: ${getRequestParameter(req)}
    [Stack Trace]: ${err.stack}`;

  // BadRequestErrorとValidateErrorsの時だけエラーメッセージが複数のことがある。
  if (err instanceof ValidateErrors) {
    const formatErrDetail = err.errors.map((e, i) => createValidationErrorObject(e, i));
    const errDetailMsgs = formatErrDetail.join(`\n                     `);
    return ` ${err.name}
    [Error Message]: ${errDetailMsgs}
    ${commonErrMsg}`;
  }
  if (err instanceof BadRequestError) {
    const formatErrDetail = err.detailMessages.map((msg, i) => `${STATUS_CODES.badRequest}-${i}: ${msg}`);
    const errDetailMsgs = formatErrDetail.join(`\n                     `);
    return ` ${err.name}
    [Error Message]: ${errDetailMsgs}
    ${commonErrMsg}`;
  }
  return ` ${err.name}
    [Error Message]: ${err.message}
    ${commonErrMsg}`;
};

const createValidationErrorObject = (e: ValidationError, index: number) => {
  return Object.entries(e.constraints ?? []).map(
    (constraint) =>
      `${STATUS_CODES.badRequest}-${index}: 対象: ${e.target?.constructor.name} 属性: ${e.property}, 値: ${e.value}, メッセージ: ${constraint[1]}`,
  );
};

const getRequestParameter = (req: Request) => {
  try {
    // ログに出したくない値がある場合はこの時点で削除
    return JSON.stringify(req.body);
  } catch (err) {
    logger.error(err);
  }
};
