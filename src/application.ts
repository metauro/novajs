import fastify from 'fastify';
import { ReflectiveInjector } from 'injection-js';
import { KlassScanner } from './scanners';
import { ApplicationContext, ApplicationOptions } from './interfaces';
import { internalLoggerService } from './services';
import { Controller } from './controller';

export class FastifyPlusApplication {
  constructor(protected readonly ctx: ApplicationContext) {}

  static async create(
    options: ApplicationOptions,
    http = fastify(options.fastifyOptions),
  ) {
    return new FastifyPlusApplication({
      http,
      injector: ReflectiveInjector.resolveAndCreate(
        (await KlassScanner.scan(options.appRootPath)).map(k => k.type),
      ),
      ...options,
    });
  }

  public async getFastifyInstance() {
    return this.ctx.http;
  }

  public async start(port: number, address?: string) {
    const controller = new Controller(this.ctx);
    await controller.registerControllers();
    await this.listen(port, address);
  }

  listen(port: number, address?: string) {
    const { http } = this.ctx;
    http.listen(port, address || 'localhost', (err, address) => {
      if (err) {
        throw err;
      }

      internalLoggerService.info(`The server has listen on ${address}`);
    });
  }
}
