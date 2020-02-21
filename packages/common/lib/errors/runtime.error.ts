import { LoggerService } from '../services';

/**
 * Error will interrupt the program
 */
export class RuntimeError extends Error {
  private static logger = new LoggerService(RuntimeError.name);

  constructor(msg: string, additionMsg?: string) {
    super(' ');
    const stackArr = this.stack.split('\n');
    stackArr.shift();
    RuntimeError.logger.error(`${msg}${additionMsg ? ', ' + additionMsg : ''}
${stackArr.join('\n')}
`);
    this.stack = ' ';
  }
}
