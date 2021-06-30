import { HttpStatus, HttpException } from '@nestjs/common';
export class DataNotFoundError extends HttpException {
  constructor(dataName: string, dataValue: any) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        body: { message: `${dataName} with value '${dataValue}' not found` },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
