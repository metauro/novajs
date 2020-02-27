import { Middleware } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type FastifyMiddleware = Middleware<
  Server,
  IncomingMessage,
  ServerResponse
>;
