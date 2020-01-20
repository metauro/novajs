import { RuntimeException } from '../runtime.exception';
import { HttpStatus } from '../../enum';

export class HttpException extends RuntimeException {
  readonly message: any;

  constructor(response: object) {
    super();
    this.message = response;
  }

  static createBody(
    statusCode: HttpStatus | number,
    error: string,
    message?: any,
  ) {
    if (typeof message === 'string') {
      return {
        statusCode,
        error,
        message,
      };
    }

    return message;
  }

  toString() {
    return JSON.stringify(this.message);
  }
}
