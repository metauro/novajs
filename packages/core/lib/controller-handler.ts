import { COMMON_METADATA, HttpStatus, ReflectTool } from '@fastify-plus/common';
import { ControllerHandlerAdapter } from './adapter';
import { ControllerExplorer } from './explorers';
import { ApplicationAdapterRouteOptions, ControllerRoute } from './interfaces';

export class ControllerHandler extends ControllerHandlerAdapter {
  parseRouteHandler(route: ControllerRoute): Function {
    const returnType = ReflectTool.getOwnMetadata(
      COMMON_METADATA.RETURN_TYPE,
      route.controller.type.prototype,
      route.handler.name,
    );
    const paramsCode = ControllerExplorer.exploreRouteParams(route)
      .map(p => p.inPath)
      .join(',');
    let injectedHandler: Function;

    if (returnType === Promise) {
      injectedHandler = new Function(
        'request, response, instance, handler, requestAdapter, responseAdapter',
        `
return handler.apply(instance, [${paramsCode}]);
`,
      );
    } else {
      injectedHandler = new Function(
        'request, response, instance, handler, requestAdapter, responseAdapter',
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

    return async (req, res) => {
      const responseAdapter = this.ctx.adapter.getHttpResponseAdapter(res);

      try {
        const result = await injectedHandler(
          req,
          res,
          this.ctx.injector.get(route.controller.type),
          route.handler,
          this.ctx.adapter.getHttpRequestAdapter(req),
          responseAdapter,
        );

        if (!responseAdapter.hasSent()) {
          responseAdapter.setStatus(HttpStatus.OK).send(result);
        }
      } catch (err) {
        responseAdapter.setStatus(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    };
  }

  parseRouteOptions(route: ControllerRoute): ApplicationAdapterRouteOptions {
    return {
      ...this.ctx.adapter.controllerHandler.parseRouteOptions(route),
      handler: this.parseRouteHandler(route),
    };
  }
}
