import { HttpResponseAdapter } from '@novajs/core';
import { Response } from 'express';

export class ExpressHttpResponseAdapter extends HttpResponseAdapter {
  response: Response;

  hasSent(): boolean {
    return this.response.headersSent;
  }

  send(body: any): this {
    this.response.send(body);
    return this;
  }

  setHeader(name: string, value: string): this {
    this.response.setHeader(name, value);
    return this;
  }

  setStatus(code: number): this {
    this.response.status(code);
    return this;
  }
}
