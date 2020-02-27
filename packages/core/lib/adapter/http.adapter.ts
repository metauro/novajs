export abstract class HttpAdapter {
  abstract getRequest(): any;

  abstract getResponse(): any;

  abstract getHeader(): Record<string, string>;
  abstract getHeader(name: string): string;

  abstract getCookie(): Record<string, string>;
  abstract getCookie(name: string): string;

  abstract getParam(): Record<string, string>;
  abstract getParam(name: string): string;

  abstract getQuery(): Record<string, any>;
  abstract getQuery(name: string): any;

  abstract getBody(): Record<string, any>;

  abstract hasSent(): boolean;

  abstract setHeader(name: string, value: string): this;

  abstract setStatus(code: number): this;

  abstract send(body: any): this;
}
