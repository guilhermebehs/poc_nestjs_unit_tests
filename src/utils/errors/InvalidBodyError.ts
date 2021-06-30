import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBodyError extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        body: { message: 'Body data is null' },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
