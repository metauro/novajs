import { RuntimeError } from './runtime.error';
import isClass from 'is-class';

export class UnknownTypeError extends RuntimeError {
  constructor(
    target: Object,
    key: string | symbol,
    paramIndex?: number,
    additionMsg?: string,
  ) {
    const name = isClass(target) ? target.name : target.constructor.name;
    super(
      paramIndex
        ? `The ${paramIndex} param type is unknown on [${name}.${key.toString()}]`
        : `[${name}.${key.toString()}] type is unknown`,
      additionMsg,
    );
  }
}
