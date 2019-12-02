import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class NotFoundException extends HttpException {
  constructor(reason = 'Not Found') {
    super(HttpStatus.NOT_FOUND, reason);
  }
}
