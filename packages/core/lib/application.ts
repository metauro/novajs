import fastify from 'fastify';
import { ReflectiveInjector } from 'injection-js';
import { KlassScanner, internalLoggerService } from '@fastify-plus/common';
import { ApplicationContext, ApplicationOptions } from './interfaces';
import { ControllerHandler } from './controller-handler';

export class FastifyPlusApplication {
  constructor(protected readonly ctx: ApplicationContext) {}

  static async create(
    options: ApplicationOptions,
    http = fastify(options.fastifyOptions),
  ) {
    const klasses = await KlassScanner.scan(options.appRootPath);
    return new FastifyPlusApplication({
      http,
      klasses,
      injector: ReflectiveInjector.resolveAndCreate(klasses.map(k => k.type)),
      ...options,
    });
  }

  getContext() {
    return this.ctx;
  }

  getFastifyInstance() {
    return this.ctx.http;
  }

  async start(port: number, address?: string) {
    const controller = new ControllerHandler(this.ctx);
    await controller.registerControllers();
    await this.listen(port, address);
  }

  listen(port: number, address?: string) {
    const { http } = this.ctx;
    process.on('SIGINT', async () => {
      await http.close();
      process.exit();
    });
    return new Promise((resolve, reject) => {
      http.listen(port, address || 'localhost', (err, address) => {
        if (err) {
          reject(err);
        }

        internalLoggerService.info(`The server has listen on ${address}`);
        resolve();
      });
    });
  }
}
