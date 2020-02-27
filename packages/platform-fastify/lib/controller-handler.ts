import { ControllerHandlerAdapter, ControllerRoute } from '@fastify-plus/core';
import { FastifyRouteOptions } from './interfaces';
import { RequestHandler } from 'fastify';

export class FastifyControllerHandlerAdapter extends ControllerHandlerAdapter {
  parseRouteOptions(route: ControllerRoute): FastifyRouteOptions {
    return {
      method: route.method,
      path: route.path,
      handler: route.handler as RequestHandler,
    };
  }
}
