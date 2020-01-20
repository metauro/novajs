import {
  COMMON_METADATA,
  Klass,
  ReflectTool,
  ObjectTool,
} from '@fastify-plus/common';
import { OpenApiExplorer, Response } from '@fastify-plus/openapi';
import { Http2Response, HttpResponse } from '../http-response';
import { ControllerRoute } from '../interfaces';
import { RouteSchema } from 'fastify';
import { cloneDeep } from 'lodash';

export class ControllerExplorer {
  static explorePath(controller: Klass) {
    return OpenApiExplorer.explorePath(controller.type);
  }

  static exploreRoutes(controller: Klass): ControllerRoute[] {
    const c = controller.type.prototype;
    return ReflectTool.getOwnDecoratedFunctionKeys(c)
      .map(k =>
        OpenApiExplorer.exploreOperation(c[k])
          ? {
              ...OpenApiExplorer.exploreOperation(c[k]),
              controller,
              key: k,
              handler: c[k],
            }
          : null,
      )
      .filter(v => !!v);
  }

  static exploreRouteParams(route: ControllerRoute): string[] {
    const c = route.controller.type.prototype;
    const requestParams = OpenApiExplorer.exploreRequestParameters(
      c,
      route.key,
    );
    const requestBodies = OpenApiExplorer.exploreRequestBodies(c, route.key);
    return Reflect.getMetadata(COMMON_METADATA.PARAM_TYPES, c, route.key).map(
      (type, i) => {
        const requestParam = requestParams[i];
        const requestBody = requestBodies[i];
        const keys = [];

        if (type === HttpResponse || type === Http2Response) {
          keys.push('response');
        } else {
          keys.push('request');
        }

        if (requestParam) {
          keys.push(
            requestParam.in === 'path'
              ? 'params'
              : requestParam.in === 'header'
              ? 'headers'
              : requestParam.in,
          );
          requestParam.schema && keys.push(requestParam.name);
        } else if (requestBody) {
          keys.push('body');
        }

        return keys.join('.');
      },
    );
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

    for (const p of OpenApiExplorer.exploreRequestBodies(c, route.key)) {
      if (!p) {
        continue;
      }

      body = cloneDeep(p.content[Object.keys(p.content)[0]].schema);
      ObjectTool.walk(body, (key, val, obj) => {
        if (key === 'required' && typeof val === 'boolean') {
          delete obj[key];
        }
      });
    }

    for (const p of OpenApiExplorer.exploreRequestParameters(c, route.key)) {
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
    for (const k of Object.keys(responses)) {
      const r = responses[k] as Response;
      response[k] = cloneDeep(r.content[Object.keys(r.content)[0]].schema);
      ObjectTool.walk(response[k], (key, val, obj) => {
        if (key === 'required' && typeof val === 'boolean') {
          delete obj[key];
        }
      });
    }

    return {
      body,
      ...params,
      response,
    };
  }
}
