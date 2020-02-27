import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message?: string | object | any) {
    super({
      statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      statusMessage: 'Unsupported Media Type',
      message,
    });
  }
}
