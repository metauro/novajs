import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class UnauthorizedException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      statusMessage: 'Unauthorized',
      message,
    });
  }
}
