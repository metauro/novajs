import { Middleware, RouteOptions } from 'fastify';
import { ApplicationAdapterRouteOptions } from '@novajs/core';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type FastifyRouteOptions = Omit<RouteOptions, 'url' | 'method'> &
  Omit<ApplicationAdapterRouteOptions, 'handler'>;

export type FastifyMiddleware = Middleware<
  Server,
  IncomingMessage,
  ServerResponse
>;