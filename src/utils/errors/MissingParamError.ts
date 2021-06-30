import { HttpException, HttpStatus } from '@nestjs/common';
export class MissingParamError extends HttpException {
  constructor(paramName) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        body: { message: `Missing param: ${paramName}` },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
