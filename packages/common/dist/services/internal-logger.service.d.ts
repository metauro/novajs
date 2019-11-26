import { Chalk } from 'chalk';
declare type LoggerLevel =
  | 'silly'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';
export declare class InternalLoggerService {
  silly(message: string): any;
  silly(infoObject: object): any;
  debug(message: string): any;
  debug(infoObject: object): any;
  info(message: string): any;
  info(infoObject: object): any;
  warn(message: string): any;
  warn(infoObject: object): any;
  error(message: string): any;
  error(infoObject: object): any;
  fatal(message: string): any;
  fatal(infoObject: object): any;
  log(
    loggerLevel: LoggerLevel,
    message: string | object,
    chalked?: Chalk,
  ): void;
}
export declare const internalLoggerService: InternalLoggerService;
export {};
