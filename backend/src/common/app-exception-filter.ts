import { ArgumentsHost, Catch, HttpException, NotFoundException } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { Response } from 'express-serve-static-core';
import * as _ from 'lodash';

/*
 * Adapted from Nest BaseExceptionFilter.
 * https://github.com/nestjs/nest/blob/eb8f4ec4420da75db936145d496cdc2d7044bf50/packages/core/exceptions/base-exception-filter.ts
 *
 * Code was inlined instead of using inheritance so we log runtime errors only once in the app,
 * using our own logger (bypassing NestJS' 'ExceptionsHandler' Logger).
 *
 * This way, we have error logs consistent with our info logs.
 * And besides, NestJS' 'ExceptionHandler' Logger logs a single error with line breaks.
 * This is not good for papertrail, because each line is considered as a separate log entry.
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        error = this.adaptError(error);

        if (!(error instanceof HttpException)) {
            /*
             *  Only log errors like:
             *  - (null as any).something()
             *  - throw new Error('something')
             *
             *  We don't need to log HttpExceptions, as they are part of the normal flow
             *  of our app (i.e., they are predictable).
             *  Examples:
             *  UnprocessableEntityException, UnauthorizedException, NotFoundException,
             *  BadRequestException, BadGatewayException, class-validator Validation errors.
             */
            console.error(error);
        }

        if (error instanceof HttpException) {
            return this.handleHttpException(error, host);
        }
        return this.handleUnknownError(host);
    }

    private adaptError(error: any): any {
        if (error.name === 'EntityNotFound') {
            const matches = error.message.match(/^Could not find any entity of type "([^"]+)"/);
            if (matches) {
                error.message = `Could not find ${matches[1]}.`;
            }
            return new NotFoundException(error.message);
        }
        if (error.name === 'ValidationError') {
        }
        return error;
    }

    private handleHttpException(exception: HttpException, host: ArgumentsHost): void {
        const status = exception.getStatus();
        const body = this.httpExceptionToObject(exception);
        this.respond(host, status, body);
    }

    /*
        throw new UnprocessableEntityException({
            message: 'Hello',
            fruit: 'apples',
            info: {
                number: 9,
            },
        })

        Turns into:

        {
          "message": "Hello",
          "fruit": "apples",
          "info": {
            "number": 9
          },
          "statusCode": 422
        }
     */
    private httpExceptionToObject(exception: HttpException): any {
        const res = exception.getResponse();
        const body: any = _.isObject(res)
            ? res
            : {
                  message: res,
              };
        body.statusCode = exception.getStatus();
        /*
           Nest does for e.g. UnauthorizedException:
           { error: "Unauthorized" }
           We do instead:
           { message: "Unauthorized" }
         */
        if (!body.message && body.error) {
            body.message = body.error;
            delete body.error;
        }
        return body;
    }

    public handleUnknownError(host: ArgumentsHost) {
        return this.respond(host, 500, {
            statusCode: 500,
            message: 'Internal server error',
        });
    }

    private respond(host: ArgumentsHost, status: number, body: any): void {
        host.switchToHttp()
            .getResponse<Response>()
            .status(status)
            .json(body);
    }
}
