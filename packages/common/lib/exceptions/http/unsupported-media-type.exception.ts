import { HttpException } from './http.exception';
import { HttpStatus } from '../../enum';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message?: string | object | any) {
    super(
      HttpException.createBody(
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        'Unsupported Media Type',
        message,
      ),
    );
  }
}
