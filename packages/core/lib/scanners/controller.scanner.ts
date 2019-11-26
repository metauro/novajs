import {
  Controller,
  ControllerMetadata,
  ControllerParam,
  ControllerRoute,
  RequestDataMetadata,
  RequestMappingMetadata,
} from '../interfaces';
import { COMMON_METADATA, KlassTool, ReflectTool } from '@fastify-plus/common';
import { CORE_METADATA } from '../constants';
import { Class } from 'utility-types';
import { Http2Response, HttpResponse } from '../http-response';
import { KlassScanner } from '@fastify-plus/common';

export class ControllerScanner {
  static async scan(dir: string) {
    const klasses = await KlassScanner.scan(dir);
    const result: Controller[] = [];

    for (const klass of klasses) {
      const controllerMetadata = ReflectTool.getMetadata<ControllerMetadata>(
        CORE_METADATA.CONTROLLER,
        klass.type,
      );

      if (!controllerMetadata) {
        continue;
      }

      const target = klass.type.prototype;
      const routes: ControllerRoute[] = [];
      for (const key of KlassTool.getOwnerFunctionKeys(target)) {
        const requestMappingMetadata = ReflectTool.getMetadata<
          RequestMappingMetadata
        >(CORE_METADATA.REQUEST_MAPPING, target[key]);

        if (!requestMappingMetadata) {
          continue;
        }

        const params: ControllerParam[] = (
          ReflectTool.getMetadata<Array<Class<any>>>(
            COMMON_METADATA.PARAM_TYPES,
            target,
            key,
          ) || []
        ).map(t => ({
          useParamKey:
            t === HttpResponse || t === Http2Response ? 'response' : 'request',
          type: t,
        }));
        const requestDataMetadata =
          ReflectTool.getMetadata<RequestDataMetadata[]>(
            CORE_METADATA.REQUEST_DATA,
            target,
            key,
          ) || [];

        requestDataMetadata.forEach((m, i) => {
          m && (params[i].useParamKey += `.${m.place}`);
        });

        let path =
          controllerMetadata.prefix + (requestMappingMetadata.path || '');

        // remove surplus /
        for (let i = 0, len = path.length; i < len; i++) {
          if (path[i] === '/' && path[i + 1] === '/') {
            path = path.slice(i + 1);
          }
        }

        routes.push({
          key,
          handler: klass.type.prototype[key],
          path,
          method: requestMappingMetadata.method,
          returnType: ReflectTool.getMetadata(
            COMMON_METADATA.RETURN_TYPE,
            klass.type.prototype,
            key,
          ),
          params,
        });
      }
      result.push({
        klass,
        routes,
      });
    }

    return result;
  }
}
