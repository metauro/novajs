/// <reference types="node" />
import fastify from 'fastify';
import { ApplicationContext, ApplicationOptions } from './interfaces';
export declare class FastifyPlusApplication {
  protected readonly ctx: ApplicationContext;
  constructor(ctx: ApplicationContext);
  static create(
    options: ApplicationOptions,
    http?: fastify.FastifyInstance<
      import('http').Server,
      import('http').IncomingMessage,
      import('http').ServerResponse
    >,
  ): Promise<FastifyPlusApplication>;
  getContext(): ApplicationContext;
  getFastifyInstance(): fastify.FastifyInstance<
    import('http').Server,
    import('http').IncomingMessage,
    import('http').ServerResponse
  >;
  start(port: number, address?: string): Promise<void>;
  listen(port: number, address?: string): void;
}
