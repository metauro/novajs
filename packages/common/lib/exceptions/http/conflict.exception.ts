import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class ConflictException extends HttpException {
  constructor(message?: string | object | any) {
    super(HttpException.createBody(HttpStatus.CONFLICT, 'Conflict', message));
  }
}
