import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { translateStatus } from './translate-status';

/**
 * Translates all thrown HttpExceptions from the server to Hebrew
 * before they reach the client.
 *
 * Exceptions are sent to the client in the form:
 * `{ message: <Hebrew Message>, statusCode: number }`
 *
 * Usage: In your NestJS project's `main.ts` file,
 * insert the following lines:
 *
 * ```const adapterHost = app.get(HttpAdapterHost);
 * app.useGlobalFilters(new TranslateExceptions(adapterHost));```
 *
 * (You'll need to import `TranslateExceptions`,
 * and import `HttpAdapterHost` from @nestjs/core)
 */
@Catch()
export class TranslateExceptions implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const responseBody = {
      statusCode: status,
      message: translateStatus(status),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
