import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class RequestTimeoutException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.REQUEST_TIMEOUT,
        'Request Timeout',
        message,
      ),
    );
  }
}
