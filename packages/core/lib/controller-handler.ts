import urljoin from 'url-join';
import { ControllerScanner } from './scanners';
import { COMMON_METADATA, internalLoggerService } from '@fastify-plus/common';
import { HTTPMethod } from 'fastify';
import { ApplicationContext, ControllerRoute } from './interfaces';
import { ControllerExplorer } from './explorers';

export class ControllerHandler {
  constructor(protected readonly ctx: ApplicationContext) {}

  public async registerControllers() {
    const { injector, http, klasses } = this.ctx;
    internalLoggerService.info('scan controllers');
    for (const controller of await ControllerScanner.scan(klasses)) {
      internalLoggerService.info(`found controller: ${controller.type.name}`);
      const path = ControllerExplorer.explorePath(controller);
      for (const route of ControllerExplorer.exploreRoutes(controller)) {
        const instance = injector.get(controller.type);
        const handler = this.getRouteHandler(route);
        const url = urljoin('/', path.prefix, route.path);
        const method = route.method.toUpperCase() as HTTPMethod;
        const schema = ControllerExplorer.exploreRouteSchema(route);
        internalLoggerService.info(
          `found controller: ${controller.type.name}, route: ${route.handler.name}, path: ${url} method: ${method}`,
        );
        internalLoggerService.debug(
          `use schema: ${JSON.stringify(schema, null, 2)}`,
        );

        http.route({
          url,
          method,
          schema,
          handler: (request, response) => {
            handler(request, response, instance, route.handler)
              .then(res => {
                !response.sent && response.send(res);
              })
              .catch(err => {
                response.send(err);
              });
          },
        });
      }
    }
  }

  protected getRouteHandler(route: ControllerRoute): Function {
    const retType = Reflect.getMetadata(
      COMMON_METADATA.RETURN_TYPE,
      route.controller.type.prototype,
      route.handler.name,
    );
    const paramsCode = ControllerExplorer.exploreRouteParams(route).join(',');

    if (retType === Promise) {
      return new Function(
        'request, response, instance, handler',
        `
return handler.apply(instance, [${paramsCode}]);               
      `,
      );
    }

    return new Function(
      'request, response, instance, handler',
      `
return new Promise((resolve, reject) => {
  try {
    resolve(handler.apply(instance, [${paramsCode}]));   
  } catch(err) {
    reject(err);
  }
})   
`,
    );
  }
}
