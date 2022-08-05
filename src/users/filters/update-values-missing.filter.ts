import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateValuesMissingError } from 'typeorm';

@Catch(UpdateValuesMissingError)
export class UpdateValuesMissingFilter<T> implements ExceptionFilter {
  catch(exception: UpdateValuesMissingError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_IMPLEMENTED).json({
      statusCode: HttpStatus.NOT_IMPLEMENTED,
      message: 'Undefined update value',
    });
  }
}
