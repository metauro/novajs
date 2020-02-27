import {
  COMMON_METADATA,
  Klass,
  ObjectTool,
  ReflectTool,
  HttpStatus,
} from '@novajs/common';
import {
  OPENAPI_METADATA,
  OpenApiExplorer,
  OperationMetadata,
  Parameter,
  ParameterMetadata,
  RequestBody,
} from '@novajs/openapi';
import {
  ApplicationContext,
  ControllerRoute,
  ControllerRouteParam,
} from '../interfaces';
import { RouteSchema } from 'fastify';
import { cloneDeep } from 'lodash';
import { CORE_METADATA } from '../constants';

export class ControllerExplorer {
  constructor(protected readonly ctx: ApplicationContext) {}

  exploreRoutes(controller: Klass): ControllerRoute[] {
    const c = controller.type.prototype;
    return ReflectTool.getOwnDecoratedFunctionKeys(c)
      .map(k => {
        const operation = c[k];
        const metadata = ReflectTool.getMetadata<OperationMetadata>(
          OPENAPI_METADATA.API_OPERATION,
          operation,
        );

        if (!metadata) {
          return null;
        }

        const route = {
          ...metadata,
          ...OpenApiExplorer.exploreOperation(c, operation),
          nodeStylePath: OpenApiExplorer.explorePath(
            controller.type,
            operation,
          ).replace(/{(.*)}\/?/, (_, match) => {
            return `:${match}`;
          }),
          path: OpenApiExplorer.explorePath(controller.type, operation),
          controller,
          handler: c[k],
          injectedHandler: null,
          schema: {},
        };
        route.schema = this.exploreRouteSchema(route);
        route.injectedHandler = this.hackRouteHandler(route);
        return route;
      })
      .filter(v => !!v);
  }

  exploreRouteParams(route: ControllerRoute): ControllerRouteParam[] {
    const c = route.controller.type.prototype;
    const requestParams =
      ReflectTool.getOwnMetadata<ParameterMetadata[]>(
        OPENAPI_METADATA.API_REQUEST_PARAMETER,
        c,
        route.handler.name,
      ) || [];
    const requestBodies =
      ReflectTool.getOwnMetadata<RequestBody[]>(
        OPENAPI_METADATA.API_REQUEST_BODY,
        c,
        route.handler.name,
      ) || [];

    return ReflectTool.getOwnMetadata(
      COMMON_METADATA.PARAM_TYPES,
      c,
      route.handler.name,
    ).map((type, i) => {
      const requestParam = requestParams[i];
      const requestBody = requestBodies[i];
      const keys = [];
      const result = {} as ControllerRouteParam;

      if (
        (ReflectTool.getOwnMetadata<boolean[]>(
          CORE_METADATA.REQ,
          c,
          route.handler.name,
        ) || [])[i]
      ) {
        keys.push('httpAdapter', 'getRequest()');
      } else if (
        (ReflectTool.getOwnMetadata<boolean[]>(
          CORE_METADATA.RES,
          c,
          route.handler.name,
        ) || [])[i]
      ) {
        keys.push('httpAdapter', 'getResponse()');
      } else if (requestParam) {
        keys.push(
          'httpAdapter',
          `${
            {
              header: 'getHeader',
              cookie: 'getCookie',
              path: 'getParam',
              query: 'getQuery',
            }[requestParam.in]
          }${requestParam.schema ? `('${requestParam.name}')` : '()'}`,
        );
        result.in = requestParam.in;
        result.name = requestParam.name;
      } else if (requestBody) {
        result.in = 'body';
        keys.push('httpAdapter', 'getBody()');
      }

      result.inPath = keys.join('.');

      return result;
    });
  }

  private hackRouteHandler(route: ControllerRoute) {
    const returnType = ReflectTool.getOwnMetadata(
      COMMON_METADATA.RETURN_TYPE,
      route.controller.type.prototype,
      route.handler.name,
    );
    const paramsCode = this.exploreRouteParams(route)
      .map(p => p.inPath)
      .join(',');
    let injectedHandler: Function;

    if (returnType === Promise) {
      injectedHandler = new Function(
        'httpAdapter, instance, handler',
        `
return handler.apply(instance, [${paramsCode}]);
`,
      );
    } else {
      injectedHandler = new Function(
        'httpAdapter, instance, handler',
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

    return async (...args: any[]) => {
      const httpAdapter = this.ctx.adapter.getHttpAdapter(...args);

      try {
        const result = await injectedHandler(
          httpAdapter,
          this.ctx.injector.get(route.controller.type),
          route.handler,
        );

        if (!httpAdapter.hasSent()) {
          httpAdapter.setStatus(HttpStatus.OK).send(result);
        }
      } catch (err) {
        httpAdapter.setStatus(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    };
  }

  exploreRouteSchema(route: ControllerRoute): RouteSchema {
    const target = this.ctx.openApi.paths[route.path][route.method];
    const extractParams = (place: Array<Parameter['in']>) => {
      const properties = target.parameters.filter(
        p => 'in' in p && place.includes(p.in),
      ) as Parameter[];

      return {
        type: 'object',
        properties: properties.reduce((result, p) => {
          result[p.name] = p.schema;
          return result;
        }, {}),
        required: properties.filter(p => p.required).map(p => p.name),
      };
    };

    return {
      headers: extractParams(['header', 'cookie']),
      querystring: extractParams(['query']),
      params: extractParams(['path']),
      body:
        target.requestBody.content[Object.keys(target.requestBody.content)[0]]
          .schema,
    };
  }

  static exploreRouteSchema(route: ControllerRoute): RouteSchema {
    let body: any;
    const params = {} as any;
    const paramKeyMap = {
      query: 'querystring',
      path: 'params',
      header: 'headers',
    };
    const response = {} as any;
    const c = route.controller.type.prototype;

    const requestBody = OpenApiExplorer.exploreRequestBody(c, route.handler);
    if (requestBody) {
      body = cloneDeep(
        requestBody.content[Object.keys(requestBody.content)[0]].schema,
      );
    }
    ObjectTool.walk(body, (key, val, obj) => {
      if (key === 'required' && typeof val === 'boolean') {
        delete obj[key];
      }
    });

    for (const p of OpenApiExplorer.exploreRequestParameters(
      c,
      route.handler,
    )) {
      if (!p || !paramKeyMap[p.in]) {
        continue;
      }

      const key = paramKeyMap[p.in];

      if (!params[key]) {
        params[key] = {
          type: 'object',
          required: [],
          properties: {},
        };
      }
      params[key].properties[p.name] = p.schema;
      p.required && params[key].required.push(p.name);
    }

    // const responses = OpenApiExplorer.exploreResponses(route.handler);
    // for (const k of Object.keys(responses)) {
    //   const r = responses[k] as Response;
    //   response[k] = cloneDeep(r.content[Object.keys(r.content)[0]].schema);
    //   ObjectTool.walk(response[k], (key, val, obj) => {
    //     if (key === 'required' && typeof val === 'boolean') {
    //       delete obj[key];
    //     }
    //   });
    // }

    return {
      body,
      ...params,
      response,
    };
  }
}
