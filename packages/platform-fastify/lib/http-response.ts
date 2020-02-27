import { HttpResponseAdapter } from '@novajs/core';
import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

export class FastifyHttpResponseAdapter extends HttpResponseAdapter {
  response: FastifyReply<ServerResponse>;

  hasSent(): boolean {
    return this.response.sent;
  }

  send(body: any): this {
    this.response.send(body);
    return this;
  }

  setHeader(name: string, value: string): this {
    this.response.header(name, value);
    return this;
  }

  setStatus(code: number): this {
    this.response.status(code);
    return this;
  }
}
