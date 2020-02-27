import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class TooManyRequestsException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      statusMessage: 'Too Many Requests',
      message,
    });
  }
}
