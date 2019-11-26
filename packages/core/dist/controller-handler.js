"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanners_1 = require("./scanners");
const services_1 = require("./services");
class ControllerHandler {
    constructor(ctx) {
        this.ctx = ctx;
    }
    registerControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { appRootPath, injector, http } = this.ctx;
            for (const controller of yield scanners_1.ControllerScanner.scan(appRootPath)) {
                services_1.internalLoggerService.info(`found controller: ${controller.klass.type.name}`);
                for (const route of controller.routes) {
                    services_1.internalLoggerService.info(`found route: [${route.handler.name}], path: [${route.path}], method: [${route.method}]`);
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
        });
    }
    getRouteHandler(route) {
        return route.returnType === Promise
            ? new Function('request, response, instance, handler', `
  handler.apply(instance, [${route.params.map(p => p.useParamKey).join(',')}])
    .then(result => {
      if (!response.sent) {
        response.send(result);
      }
    })
    .catch(err => {
      response.send(err);
    });
`)
            : new Function('request, response, instance, handler', `      
  try {
    const result = handler.apply(instance, [${route.params
                .map(p => p.useParamKey)
                .join(',')}]);
    if (!response.sent) {
      response.send(result);
    } 
  } catch(e) {
    response.send(e);
  }
`);
    }
}
exports.ControllerHandler = ControllerHandler;
//# sourceMappingURL=controller-handler.js.map