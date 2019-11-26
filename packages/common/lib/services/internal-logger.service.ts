import chalk, { Chalk } from 'chalk';
import { upperFirst } from 'lodash';

type LoggerLevel = 'silly' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export class InternalLoggerService {
  silly(message: string);
  silly(infoObject: object);
  silly(messageOrObject: string | object): void {
    this.log('silly', messageOrObject, chalk.gray);
  }

  debug(message: string);
  debug(infoObject: object);
  debug(messageOrObject: string | object): void {
    this.log('debug', messageOrObject, chalk.cyan);
  }

  info(message: string);
  info(infoObject: object);
  info(messageOrObject: string | object): void {
    this.log('info', messageOrObject, chalk.green);
  }

  warn(message: string);
  warn(infoObject: object);
  warn(messageOrObject: string | object): void {
    this.log('warn', messageOrObject, chalk.yellow.bold);
  }

  error(message: string);
  error(infoObject: object);
  error(messageOrObject: string | object): void {
    this.log('error', messageOrObject, chalk.red.bold);
  }

  fatal(message: string);
  fatal(infoObject: object);
  fatal(messageOrObject: string | object): void {
    this.log('fatal', messageOrObject, chalk.magenta.bold);
  }

  log(
    loggerLevel: LoggerLevel,
    message: string | object,
    chalked?: Chalk,
  ): void {
    chalked = chalked || chalk.white;
    process.stdout.write(
      chalked(
        `\n[Fastify Plus ${upperFirst(loggerLevel)}]: ${
          typeof message === 'string' ? message : JSON.stringify(message)
        }`,
      ),
    );
  }
}

export const internalLoggerService = new InternalLoggerService();
