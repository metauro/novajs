import { HttpRequestAdapter } from '@novajs/core';
import { FastifyRequest } from 'fastify';
import { RuntimeError } from '@novajs/common';

export class FastifyHttpRequestAdapter extends HttpRequestAdapter {
  request: FastifyRequest;

  getBody(): Record<string, any> {
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
}
