import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class ForbiddenException extends HttpException {
  constructor(message?: string | object | any) {
    super(HttpException.createBody(HttpStatus.FORBIDDEN, 'Forbidden', message));
  }
}
