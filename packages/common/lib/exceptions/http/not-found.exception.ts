import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class NotFoundException extends HttpException {
  constructor(message?: string | object | any) {
    super(HttpException.createBody(HttpStatus.NOT_FOUND, 'Not Found', message));
  }
}
