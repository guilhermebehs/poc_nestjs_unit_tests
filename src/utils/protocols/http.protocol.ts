import { HttpStatus } from '@nestjs/common';

export interface HttpResponse {
  statusCode: HttpStatus;
  body?: any;
}
