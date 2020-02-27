import { HttpAdapter } from '@novajs/core';
import { Request, Response } from 'express';

export class ExpressHttpAdapter extends HttpAdapter {
  constructor(
    protected readonly request: Request,
    protected readonly response: Response,
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

  hasSent() {
    return this.response.headersSent;
  }

  send(body: any) {
    this.response.send(body);
    return this;
  }

  setHeader(name: string, value: string) {
    this.response.setHeader(name, value);
    return this;
  }

  setStatus(code: number) {
    this.response.status(code);
    return this;
  }
}
