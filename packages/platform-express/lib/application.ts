import express, { Express } from 'express';
import {
  ApplicationAdapter,
  HttpRequestAdapter,
  HttpResponseAdapter,
} from '@fastify-plus/core';
import { Server } from 'http';
import { RuntimeError } from '@fastify-plus/common';
import { ExpressMiddleware, ExpressRouteOptions } from './interfaces';
import { ExpressControllerHandlerAdapter } from './controller-handler';
import { ExpressHttpRequestAdapter } from './http-request';
import { ExpressHttpResponseAdapter } from './http-response';

export class ExpressApplicationAdapter extends ApplicationAdapter {
  readonly server: Express;

  private internalServer: Server;

  readonly controllerHandler = new ExpressControllerHandlerAdapter(this.ctx);

  static create() {
    return new ExpressApplicationAdapter();
  }

  protected constructor() {
    super();
    this.server = express();
  }

  getHttpRequestAdapter(request: any): HttpRequestAdapter {
    return new ExpressHttpRequestAdapter(request);
  }

  getHttpResponseAdapter(response: any): HttpResponseAdapter {
    return new ExpressHttpResponseAdapter(response);
  }

  route({ path, method, handler }: ExpressRouteOptions) {
    this.server.route(path)[method](handler);
    return this;
  }

  use(middleware: ExpressMiddleware): this;
  use(path: string, middleware: ExpressMiddleware): this;
  use(path: string | ExpressMiddleware, middleware?: ExpressMiddleware) {
    this.server.use(path as any, middleware);
    return this;
  }

  async close() {
    return new Promise<void>((resolve, reject) => {
      if (!this.internalServer) {
        reject(
          new RuntimeError('cannot close the server because it not running'),
        );
      }
      this.internalServer.close(err => {
        err ? reject(err) : resolve();
      });
    });
  }

  async listen(port: number, address?: string) {
    return new Promise<void>((resolve, reject) => {
      this.internalServer = this.server.listen(port, address, err => {
        err ? reject(err) : resolve();
      });
    });
  }
}
