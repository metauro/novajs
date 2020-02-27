import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HTTPMethod,
  Middleware,
  ServerOptionsAsHttp,
  ServerOptionsAsHttp2,
  ServerOptionsAsSecureHttp,
  ServerOptionsAsSecureHttp2,
} from 'fastify';
import { ApplicationAdapter, ControllerRoute } from '@novajs/core';
import { FastifyMiddleware } from './interfaces';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyHttpAdapter } from './fastify-http.adapter';

export class FastifyApplicationAdapter extends ApplicationAdapter {
  readonly server: FastifyInstance;

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

  getHttpAdapter(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
    return new FastifyHttpAdapter(request, reply);
  }

  route({ nodeStylePath, method, injectedHandler, schema }: ControllerRoute) {
    this.server.route({
      url: nodeStylePath,
      method: method.toUpperCase() as HTTPMethod,
      handler: injectedHandler,
      schema,
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
