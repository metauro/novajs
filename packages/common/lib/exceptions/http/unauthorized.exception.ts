import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class UnauthorizedException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized',
        message,
      ),
    );
  }
}
