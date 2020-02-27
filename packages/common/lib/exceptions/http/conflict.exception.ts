import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class ConflictException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.CONFLICT,
      statusMessage: 'Conflict',
      message,
    });
  }
}
