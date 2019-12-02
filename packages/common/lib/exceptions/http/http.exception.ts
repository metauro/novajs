import { RuntimeException } from '../runtime.exception';
import { HttpStatus } from '../../enum';

export class HttpException extends RuntimeException {
  constructor(statusCode: HttpStatus, reason: string) {
    super(`[Http Exception]: ${statusCode} ${reason}`);
  }
}
