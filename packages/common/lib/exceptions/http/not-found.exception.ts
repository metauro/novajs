import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class NotFoundException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      statusMessage: 'Not Found',
      message,
    });
  }
}
