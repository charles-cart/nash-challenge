import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { Response } from 'express';
import { isAxiosError } from '@nestjs/terminus/dist/utils';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: AxiosError | HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : isAxiosError(exception)
          ? exception.response.status
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMsg: any =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const error = errorMsg.hasOwnProperty('response')
      ? errorMsg.response?.error || errorMsg.response?.data || errorMsg.response
      : errorMsg.name || errorMsg;

    const data =
      typeof error === 'object'
        ? error
        : {
            statusCode: status,
            message: errorMsg.message,
            error,
          };

    response.status(status).json(data);
  }
}
