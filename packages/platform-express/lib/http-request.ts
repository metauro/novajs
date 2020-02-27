import { HttpRequestAdapter } from '@novajs/core';
import { Request } from 'express';

export class ExpressHttpRequestAdapter extends HttpRequestAdapter {
  request: Request;

  getBody(): Record<string, any> {
    return this.request.body;
  }

  getCookie(): Record<string, string>;
  getCookie(name: string): string;
  getCookie(name?: string) {
    return name ? this.request.cookies[name] : this.request.cookies;
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
