import { RuntimeException } from '../runtime.exception';
import { HttpExceptionResponse } from '../../interfaces';

export class HttpException extends RuntimeException {
  constructor(public readonly response: HttpExceptionResponse) {
    super();
  }
}
