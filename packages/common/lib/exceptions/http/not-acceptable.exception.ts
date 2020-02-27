import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class NotAcceptableException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.NOT_ACCEPTABLE,
      statusMessage: 'Not Acceptable',
      message,
    });
  }
}
