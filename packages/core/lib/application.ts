import { ReflectiveInjector } from 'injection-js';
import {
  ILogger,
  KlassScanner,
  LoggerOptions,
  LoggerService,
} from '@fastify-plus/common';
import { ApplicationContext, ApplicationOptions } from './interfaces';
import { ApplicationAdapter } from './adapter';
import { OpenApiScanner } from '@fastify-plus/openapi';
import { ControllerScanner } from './scanners';
import { ControllerExplorer } from './explorers';
import { ControllerHandler } from './controller-handler';

export class Application<
  Adapter extends ApplicationAdapter = ApplicationAdapter
> {
  private static logger = new LoggerService(Application.name);

  protected controllerHandler = new ControllerHandler(this.ctx);

  static async create(options: ApplicationOptions) {
    const klasses = await KlassScanner.scan(options.appRootPath);
    const ctx = {
      klasses,
      injector: ReflectiveInjector.resolveAndCreate(klasses.map(k => k.type)),
      openApi: OpenApiScanner.scan(klasses),
      ...options,
    } as ApplicationContext;
    ctx.adapter.setContext(ctx);
    return new Application(ctx);
  }

  protected constructor(protected readonly ctx: ApplicationContext) {
    for (const controller of ControllerScanner.scan(ctx.klasses)) {
      for (const route of ControllerExplorer.exploreRoutes(controller)) {
        if (route.method === 'trace') {
          continue;
        }

        const options = this.controllerHandler.parseRouteOptions(route);
        this.ctx.adapter.route(options);
        Application.logger.info(
          `map route to [method: ${options.method}] [path: ${options.path}]`,
        );
      }
    }
  }

  getContext() {
    return this.ctx;
  }

  async listen(port: number, address?: string) {
    await this.ctx.adapter.listen(port, address);
    Application.logger.info(
      `The server has listen on ${address || '127.0.0.1'}:${port}`,
    );
  }

  async close() {
    await this.ctx.adapter.close();
    Application.logger.info(
      `The server has been close at ${new Date().toLocaleString()}`,
    );
  }

  overrideLogger(logger: ILogger) {
    LoggerService.override(logger);
    return this;
  }

  setLoggerOptions(options: LoggerOptions) {
    LoggerService.setOptions(options);
    return this;
  }
}
