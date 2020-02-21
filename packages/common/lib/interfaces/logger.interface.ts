export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LoggerOptions = {
  logLevel: LogLevel;
};

export type ILogger = {
  [K in LogLevel]: (message: string | object) => void;
};
