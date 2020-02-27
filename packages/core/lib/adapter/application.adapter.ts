import { ApplicationContext, ControllerRoute } from '../interfaces';
import { HttpAdapter } from './http.adapter';

export abstract class ApplicationAdapter {
  protected ctx: ApplicationContext;

  setContext(ctx: ApplicationContext) {
    this.ctx = ctx;
    return this;
  }

  /**
   * the http lib server instance
   */
  abstract readonly server: any;

  abstract getHttpAdapter(...args: any[]): HttpAdapter;

  abstract route(route: ControllerRoute): this;

  abstract use(middleware: Function): this;
  abstract use(path: string, middleware: Function): this;
  abstract use(path: string | Function, middleware?: Function): this;

  abstract async listen(port: number, address?: string): Promise<void>;

  abstract async close(): Promise<void>;
}
