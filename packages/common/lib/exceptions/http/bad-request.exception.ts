import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class BadRequestException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      statusMessage: 'Bad Request',
      message,
    });
  }
}
