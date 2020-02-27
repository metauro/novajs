import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class NotAcceptableException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.NOT_ACCEPTABLE,
        'Not Acceptable',
        message,
      ),
    );
  }
}
