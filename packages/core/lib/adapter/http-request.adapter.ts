export abstract class HttpRequestAdapter {
  constructor(protected readonly request: any) {}

  abstract getHeader(): Record<string, string>;
  abstract getHeader(name: string): string;

  abstract getCookie(): Record<string, string>;
  abstract getCookie(name: string): string;

  abstract getParam(): Record<string, string>;
  abstract getParam(name: string): string;

  abstract getQuery(): Record<string, any>;
  abstract getQuery(name: string): any;

  abstract getBody(): Record<string, any>;
}
