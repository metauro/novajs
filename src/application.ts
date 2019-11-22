import fastify from 'fastify';
import { ReflectiveInjector } from 'injection-js';
import { KlassScanner } from './scanners';
import { ApplicationContext, ApplicationOptions } from './interfaces';
import { internalLoggerService } from './services';
import { Class } from 'utility-types';
import { Controller } from './controller';

export class FastifyPlusApplication {
  protected instanceMap: Map<Class<any>, object> = new Map();

  constructor(protected readonly ctx: ApplicationContext) {}

  static async create(
    options: ApplicationOptions,
    http = fastify(options.fastifyOptions),
  ) {
    return new FastifyPlusApplication({
      http,
      injector: null,
      ...options,
    });
  }

  public async getFastifyInstance() {
    return this.ctx.http;
  }

  public async start(port: number, address?: string) {
    const { appRootPath } = this.ctx;
    const klasses = await KlassScanner.scan(appRootPath);
    this.ctx.injector = ReflectiveInjector.resolveAndCreate(
      klasses.map(k => k.type),
    );
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

    const handleExit = async err => {
      console.error(err);
      await http.close();
      process.exit(0);
    };

    process.on('SIGINT', handleExit);
    process.on('exit', handleExit);
    process.on('SIGUSR1', handleExit);
    process.on('SIGUSR2', handleExit);
    process.on('uncaughtException', handleExit);
    process.on('unhandledRejection', handleExit);
  }
}
