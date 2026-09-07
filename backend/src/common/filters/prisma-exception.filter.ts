import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    if (exception.code === 'P2002') {
      const target = exception.meta?.target;
      const fields = Array.isArray(target)
        ? target.map(String)
        : typeof target === 'string'
          ? [target]
          : [];

      if (fields.includes('sortOrder')) {
        const message =
          'sortOrder must be unique within this list. Another item already uses this order.';
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message,
          error: 'Conflict',
        });
        return;
      }

      const message = `Unique constraint failed on: ${fields.join(', ') || 'unknown field'}`;
      res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message,
        error: 'Conflict',
      });
      return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Database request failed',
      error: 'Internal Server Error',
    });
  }
}
