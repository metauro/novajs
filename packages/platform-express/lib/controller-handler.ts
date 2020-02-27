import {
  ApplicationAdapterRouteOptions,
  ControllerHandlerAdapter,
  ControllerRoute,
} from '@fastify-plus/core';

export class ExpressControllerHandlerAdapter extends ControllerHandlerAdapter {
  parseRouteOptions(route: ControllerRoute): ApplicationAdapterRouteOptions {
    return {
      method: route.method,
      path: route.path,
      handler: route.handler,
    };
  }
}
