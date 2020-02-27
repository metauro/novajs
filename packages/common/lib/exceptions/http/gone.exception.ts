import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class GoneException extends HttpException {
  constructor(message?: string | object | any) {
    super(HttpException.createBody(HttpStatus.GONE, 'Gone', message));
  }
}
