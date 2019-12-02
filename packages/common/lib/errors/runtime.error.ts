import { internalLoggerService } from '../services';

/**
 * Error will interrupt the program
 */
export class RuntimeError extends Error {
  constructor(msg: string, additionMsg?: string) {
    super(' ');
    const stackArr = this.stack.split('\n');
    stackArr.shift();
    internalLoggerService.error(`${msg}${additionMsg ? ', ' + additionMsg : ''}
${stackArr.join('\n')}
`);
    this.stack = ' ';
  }
}
