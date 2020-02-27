export abstract class HttpResponseAdapter {
  constructor(protected readonly response: any) {}

  abstract hasSent(): boolean;

  abstract setHeader(name: string, value: string): this;

  abstract setStatus(code: number): this;

  abstract send(body: any): this;
}
