import fastify, {
  FastifyInstance,
  HTTPMethod,
  Middleware,
  ServerOptionsAsHttp,
  ServerOptionsAsHttp2,
  ServerOptionsAsSecureHttp,
  ServerOptionsAsSecureHttp2,
} from 'fastify';
import {
  ApplicationAdapter,
  HttpRequestAdapter,
  HttpResponseAdapter,
} from '@fastify-plus/core';
import { FastifyMiddleware, FastifyRouteOptions } from './interfaces';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyControllerHandlerAdapter } from './controller-handler';
import { FastifyHttpRequestAdapter } from './http-request';
import { FastifyHttpResponseAdapter } from './http-response';

export class FastifyApplicationAdapter extends ApplicationAdapter {
  readonly server: FastifyInstance;

  readonly controllerHandler = new FastifyControllerHandlerAdapter(this.ctx);

  static create(
    options?:
      | ServerOptionsAsHttp
      | ServerOptionsAsSecureHttp
      | ServerOptionsAsHttp2
      | ServerOptionsAsSecureHttp2,
  ) {
    return new FastifyApplicationAdapter(options);
  }

  protected constructor(
    options?:
      | ServerOptionsAsHttp
      | ServerOptionsAsSecureHttp
      | ServerOptionsAsHttp2
      | ServerOptionsAsSecureHttp2,
  ) {
    super();
    this.server = fastify(options);
  }

  getHttpRequestAdapter(request: any): HttpRequestAdapter {
    return new FastifyHttpRequestAdapter(request);
  }

  getHttpResponseAdapter(response: any): HttpResponseAdapter {
    return new FastifyHttpResponseAdapter(response);
  }

  route({ path, method, ...options }: FastifyRouteOptions) {
    this.server.route({
      url: path,
      method: method.toUpperCase() as HTTPMethod,
      ...options,
    });
    return this;
  }

  use(middleware: FastifyMiddleware): this;
  use(path: string, middleware: FastifyMiddleware): this;
  use(
    path: string | FastifyMiddleware,
    middleware?: Middleware<Server, IncomingMessage, ServerResponse>,
  ) {
    this.server.use(path as any, middleware);
    return this;
  }

  async close() {
    await this.server.close();
  }

  async listen(port: number, address?: string) {
    await this.server.listen(port, address);
  }
}
