import { RuntimeError } from '@novajs/common';
import { HttpAdapter } from '@novajs/core';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';

export class FastifyHttpAdapter extends HttpAdapter {
  constructor(
    protected readonly request: FastifyRequest,
    protected readonly response: FastifyReply<ServerResponse>,
  ) {
    super();
  }

  getRequest() {
    return this.request;
  }

  getResponse() {
    return this.response;
  }

  getBody() {
    return this.request.body;
  }

  getCookie(): Record<string, string>;
  getCookie(name: string): string;
  getCookie(name?: string) {
    if (!('cookies' in this.request)) {
      throw new RuntimeError(
        'if you want to get cookie on fastify, please install fastify-cookie and register it, see https://github.com/fastify/fastify-cookie',
      );
    }

    const cookies = (this.request as any).cookies;

    return name ? cookies[name] : cookies;
  }

  getHeader(): Record<string, string>;
  getHeader(name: string): string;
  getHeader(name?: string) {
    return name ? this.request.headers[name] : this.request.headers;
  }

  getParam(): Record<string, string>;
  getParam(name: string): string;
  getParam(name?: string) {
    return name ? this.request.params[name] : this.request.params;
  }

  getQuery(): Record<string, any>;
  getQuery(name: string): any;
  getQuery(name?: string) {
    return name ? this.request.query[name] : this.request.query;
  }

  hasSent() {
    return this.response.sent;
  }

  send(body: any) {
    this.response.send(body);
    return this;
  }

  setHeader(name: string, value: string) {
    this.response.header(name, value);
    return this;
  }

  setStatus(code: number) {
    this.response.status(code);
    return this;
  }
}
