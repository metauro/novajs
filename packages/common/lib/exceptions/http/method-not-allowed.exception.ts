import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class MethodNotAllowedException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.METHOD_NOT_ALLOWED,
        'Method Not Allowed',
        message,
      ),
    );
  }
}
