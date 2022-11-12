import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import translateStatus from './translate-status';

/**
 * Translates all thrown HttpExceptions from the server to Hebrew
 * before they reach the client.
 *
 * Exceptions are sent to the client in the form:
 * `{ message: <Hebrew Message>, statusCode: number }`
 *
 * Usage: In your nestjs project's `main.ts`, in `bootstrap`,
 * include the line `app.useGlobalFilters(new TranslateExceptions())`,
 * before the `app.listen()`.
 */
@Catch(HttpException)
export class TranslateExceptions implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: translateStatus(status),
    });
  }
}
