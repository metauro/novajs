import express, { Express, Request, Response } from 'express';
import { ApplicationAdapter, ControllerRoute } from '@novajs/core';
import { Server } from 'http';
import { RuntimeError } from '@novajs/common';
import { ExpressMiddleware } from './interfaces';
import { ExpressHttpAdapter } from './express-http.adapter';

export class ExpressApplicationAdapter extends ApplicationAdapter {
  readonly server: Express;

  private internalServer: Server;

  static create() {
    return new ExpressApplicationAdapter();
  }

  protected constructor() {
    super();
    this.server = express();
  }

  getHttpAdapter(request: Request, response: Response) {
    return new ExpressHttpAdapter(request, response);
  }

  route({ nodeStylePath, method, injectedHandler }: ControllerRoute) {
    this.server.route(nodeStylePath)[method](injectedHandler);
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
