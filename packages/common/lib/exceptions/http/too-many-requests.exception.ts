import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class BadRequestException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.TOO_MANY_REQUESTS,
        'Too Many Requests',
        message,
      ),
    );
  }
}
