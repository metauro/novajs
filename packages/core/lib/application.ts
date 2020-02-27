import { ReflectiveInjector } from 'injection-js';
import {
  ILogger,
  KlassScanner,
  LoggerOptions,
  LoggerService,
} from '@sojs/common';
import { ApplicationContext, ApplicationOptions } from './interfaces';
import { ApplicationAdapter } from './adapter';
import { OpenApiScanner } from '@sojs/openapi';
import { ControllerScanner } from './scanners';
import { ControllerExplorer } from './explorers';

export class Application<
  Adapter extends ApplicationAdapter = ApplicationAdapter
> {
  private static logger = new LoggerService(Application.name);

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
    const controllerExplorer = new ControllerExplorer(ctx);
    for (const controller of ControllerScanner.scan(ctx.klasses)) {
      for (const route of controllerExplorer.exploreRoutes(controller)) {
        this.ctx.adapter.route(route);
        Application.logger.info(
          `map route to [method: ${route.method}] [path: ${route.path}]`,
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
