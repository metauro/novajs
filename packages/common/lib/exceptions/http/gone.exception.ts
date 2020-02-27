import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class GoneException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.GONE,
      statusMessage: 'Gone',
      message,
    });
  }
}
