import { ControllerScanner } from './scanners';
import { internalLoggerService } from './services';
import { ApplicationContext, ControllerRoute } from './interfaces';

export class Controller {
  constructor(protected readonly ctx: ApplicationContext) {}

  public async registerControllers() {
    const { appRootPath, injector, http } = this.ctx;
    for (const controller of await ControllerScanner.scan(appRootPath)) {
      internalLoggerService.info(
        `found controller: ${controller.klass.type.name}`,
      );
      for (const route of controller.routes) {
        internalLoggerService.info(
          `found route: [${route.handler.name}], path: [${route.path}], method: [${route.method}]`,
        );
        const instance = injector.get(controller.klass.type);
        const handler = this.getRouteHandler(route);

        http.route({
          url: route.path,
          method: route.method,
          handler: (request, response) => {
            handler(request, response, instance, route.handler);
          },
        });
      }
    }
  }

  protected getRouteHandler(route: ControllerRoute): Function {
    return route.returnType === Promise
      ? new Function(
          'request, response, instance, handler',
          `
  handler.apply(instance, [${route.params.map(p => p.key).join(',')}])
    .then(result => {
      if (!response.sent) {
        response.send(result);
      }
    })
    .catch(err => {
      response.send(err);
    });
`,
        )
      : new Function(
          'request, response, instance, handler',
          `      
  try {
    const result = handler.apply(instance, [${route.params
      .map(p => p.key)
      .join(',')}]);
    if (!response.sent) {
      response.send(result);
    } 
  } catch(e) {
    response.send(e);
  }
`,
        );
  }
}
