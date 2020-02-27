import { HttpStatus } from '../enum';

export type HttpExceptionResponse = {
  statusCode: HttpStatus | number;
  statusMessage: string;
  message?: any;
};
