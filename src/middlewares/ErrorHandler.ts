import { NextFunction, Request, Response } from 'express';

import { STATUS_CODES } from '@/constants/StatusCode';
import { BadRequestError } from '@/errors/BadRequestError';
import { ConflictError } from '@/errors/ConflictError';
import { ForbiddenError } from '@/errors/ForbiddenError';
import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ValidateErrors } from '@/errors/ValidateErrors';

type TEachErrorInResponse = { ['code']: string; ['message']: string };
type TResponseBody = { ['errors']: TEachErrorInResponse[] };

// APIの返り値としてエラーを返却するためのモジュール。middlewareで使用。
export const errorHandler = (
  err: Error | Array<Error>,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  if (err instanceof ValidateErrors || err instanceof BadRequestError) {
    const statusCode = STATUS_CODES.badRequest;
    const responseBody: TResponseBody = createErrResBody(statusCode, err.name);
    res.status(statusCode).send(responseBody);
    return;
  }
  if (err instanceof NotFoundError) {
    const statusCode = STATUS_CODES.notFound;
    const responseBody: TResponseBody = createErrResBody(statusCode, err.name);
    res.status(statusCode).send(responseBody);
    return;
  }
  if (err instanceof UnauthorizedError) {
    const statusCode = STATUS_CODES.unauthorized;
    const responseBody: TResponseBody = createErrResBody(statusCode, err.name);
    res.status(statusCode).send(responseBody);
    return;
  }
  if (err instanceof ForbiddenError) {
    const statusCode = STATUS_CODES.forbidden;
    const responseBody: TResponseBody = createErrResBody(statusCode, err.name);
    res.status(statusCode).send(responseBody);
    return;
  }
  if (err instanceof ConflictError) {
    const statusCode = STATUS_CODES.conflict;
    const responseBody: TResponseBody = createErrResBody(statusCode, err.name);
    res.status(statusCode).send(responseBody);
    return;
  }
  // 500エラー
  const statusCode = STATUS_CODES.internalServerError;
  const responseBody: TResponseBody = createErrResBody(statusCode, 'Internal Server Error');
  res.status(statusCode).send(responseBody);
  return;
};

const createErrResBody = (code: number, message: string) => {
  return {
    errors: [
      {
        code: `${code}`,
        message,
      },
    ],
  };
};
