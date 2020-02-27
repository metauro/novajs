import {
  COMMON_METADATA,
  Klass,
  ObjectTool,
  ReflectTool,
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
  static create(ctx: ApplicationContext) {
    return new ControllerExplorer(ctx);
  }

  constructor(protected readonly ctx: ApplicationContext) {}

  static exploreRoutes(controller: Klass): ControllerRoute[] {
    const c = controller.type.prototype;
    return ReflectTool.getOwnDecoratedFunctionKeys(c)
      .map(k => {
        const operation = c[k];
        const metadata = ReflectTool.getMetadata<OperationMetadata>(
          OPENAPI_METADATA.API_OPERATION,
          operation,
        );
        return metadata
          ? {
              ...metadata,
              path: OpenApiExplorer.explorePath(controller.type, operation)
                /**
                 * most nodejs route define path variable such as :id, but openapi use {id}
                 * need transform it
                 */
                .replace(/{(.*)}\/?/, (_, match) => {
                  return `:${match}`;
                }),
              controller,
              key: k,
              handler: c[k],
            }
          : null;
      })
      .filter(v => !!v);
  }

  static exploreRouteParams(route: ControllerRoute): ControllerRouteParam[] {
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
        keys.push('request');
      } else if (
        (ReflectTool.getOwnMetadata<boolean[]>(
          CORE_METADATA.RES,
          c,
          route.handler.name,
        ) || [])[i]
      ) {
        keys.push('response');
      } else if (requestParam) {
        keys.push(
          'requestAdapter',
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
        keys.push('requestAdapter', 'getBody()');
      }

      result.inPath = keys.join('.');
      console.log(result.inPath);

      return result;
    });
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

    const responses = OpenApiExplorer.exploreResponses(route.handler);
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
