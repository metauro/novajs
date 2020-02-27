import {
  ApplicationAdapterRouteOptions,
  ApplicationContext,
} from '../interfaces';
import { ControllerHandlerAdapter } from './controller-handler.adapter';
import { HttpRequestAdapter } from './http-request.adapter';
import { HttpResponseAdapter } from './http-response.adapter';

export abstract class ApplicationAdapter {
  protected ctx: ApplicationContext;

  setContext(ctx: ApplicationContext) {
    this.ctx = ctx;
    return this;
  }

  abstract readonly controllerHandler: ControllerHandlerAdapter;

  /**
   * the http lib server instance
   */
  abstract readonly server: any;

  abstract getHttpRequestAdapter(request: any): HttpRequestAdapter;

  abstract getHttpResponseAdapter(response: any): HttpResponseAdapter;

  abstract route(options: ApplicationAdapterRouteOptions): this;

  abstract use(middleware: Function): this;
  abstract use(path: string, middleware: Function): this;
  abstract use(path: string | Function, middleware?: Function): this;

  abstract async listen(port: number, address?: string): Promise<void>;

  abstract async close(): Promise<void>;
}
