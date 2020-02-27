import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class ForbiddenException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      statusMessage: 'Forbidden',
      message,
    });
  }
}
