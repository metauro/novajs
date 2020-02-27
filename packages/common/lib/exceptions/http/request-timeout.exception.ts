import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class RequestTimeoutException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.REQUEST_TIMEOUT,
      statusMessage: 'Request Timeout',
      message,
    });
  }
}
