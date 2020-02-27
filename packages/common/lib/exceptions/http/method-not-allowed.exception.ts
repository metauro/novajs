import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class MethodNotAllowedException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.METHOD_NOT_ALLOWED,
      statusMessage: 'Method Not Allowed',
      message,
    });
  }
}
