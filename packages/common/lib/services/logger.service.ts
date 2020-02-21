import chalk, { Chalk } from 'chalk';
import { ILogger, LoggerOptions, LogLevel } from '../interfaces';

export class LoggerService implements ILogger {
  static instance: typeof LoggerService | ILogger = LoggerService;

  protected static logLevelMap: Record<LogLevel, number> = {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
  };

  protected static options: LoggerOptions = {
    logLevel: 'info',
  };

  static setOptions(options: LoggerOptions) {
    this.options = options;
  }

  static debug(message: string | object, options = this.options) {
    this.log('debug', message, options);
  }

  static info(message: string | object, options = this.options) {
    this.log('info', message, options);
  }

  static warn(message: string | object, options = this.options) {
    this.log('warn', message, options);
  }

  static error(message: string | object, options = this.options) {
    this.log('error', message, options);
  }

  static log(
    logLevel: LogLevel,
    message: string | object,
    options = this.options,
  ) {
    if (!this.shouldLog(logLevel, options)) {
      return;
    }

    process.stdout.write(
      typeof message === 'string' ? message : message.toString(),
    );
  }

  protected options: LoggerOptions;

  constructor(protected readonly ctx?: string) {}

  setOptions(options: LoggerOptions) {
    this.options = options;
  }

  override<T extends ILogger>(logger: T) {
    LoggerService.instance = logger;
  }

  debug(message: string | object) {
    this.log('debug', message, chalk.cyan);
  }

  info(message: string | object) {
    this.log('info', message, chalk.green);
  }

  warn(message: string | object) {
    this.log('warn', message, chalk.yellow.bold);
  }

  error(message: string | object) {
    this.log('error', message, chalk.red.bold);
  }

  log(logLevel: LogLevel, message: string | object, chalked?: Chalk) {
    if (LoggerService.instance === LoggerService) {
      chalked = chalked || chalk.white;
      LoggerService.instance[logLevel](
        chalked(
          `[Nova${this.ctx ? ' ' + this.ctx : ''}]: ${
            typeof message === 'string'
              ? message
              : JSON.stringify(message, null, 2)
          }
`,
        ),
        this.options,
      );
    } else {
      LoggerService.instance[logLevel](`[Nova${
        this.ctx ? ' ' + this.ctx : ''
      }]: ${
        typeof message === 'string' ? message : JSON.stringify(message, null, 2)
      }
`);
    }
  }

  protected static shouldLog(logLevel: LogLevel, options: LoggerOptions) {
    return this.logLevelMap[options.logLevel] >= this.logLevelMap[logLevel];
  }
}
