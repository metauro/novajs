import { KlassScanner } from './klass.scanner';
import {
  Controller,
  ControllerMetadata,
  ControllerParam,
  ControllerRoute,
  RequestDataMetadata,
  RequestMappingMetadata,
} from '../interfaces';
import { KlassTool, ReflectTool } from '../tools';
import {
  CONTROLLER_METADATA_KEY,
  PARAM_TYPES_METADATA_KEY,
  REQUEST_DATA_METADATA_KEY,
  REQUEST_MAPPING_METADATA_KEY,
  RETURN_TYPE_METADATA_KEY,
} from '../constants';
import { Class } from 'utility-types';
import { Http2Response, HttpResponse } from '../http-response';

export class ControllerScanner {
  static async scan(dir: string) {
    const klasses = await KlassScanner.scan(dir);
    const result: Controller[] = [];

    for (const klass of klasses) {
      const controllerMetadata = ReflectTool.getMetadata<ControllerMetadata>(
        CONTROLLER_METADATA_KEY,
        klass.type,
      );

      if (!controllerMetadata) {
        continue;
      }

      const routes: ControllerRoute[] = [];
      for (const key of KlassTool.getOwnerFunctionKeys(klass.type.prototype)) {
        const requestMappingMetadata = ReflectTool.getMetadata<
          RequestMappingMetadata
        >(REQUEST_MAPPING_METADATA_KEY, klass.type.prototype, key);

        if (!requestMappingMetadata) {
          continue;
        }

        const params: ControllerParam[] = (
          ReflectTool.getMetadata<Array<Class<any>>>(
            PARAM_TYPES_METADATA_KEY,
            klass.type.prototype,
            key,
          ) || []
        ).map(t => ({
          key:
            t === HttpResponse || t === Http2Response ? 'response' : 'request',
          type: t,
        }));
        const requestDataMetadata =
          ReflectTool.getMetadata<RequestDataMetadata[]>(
            REQUEST_DATA_METADATA_KEY,
            klass.type.prototype,
            key,
          ) || [];

        requestDataMetadata.forEach(m => {
          params[m.paramIndex].key += `.${m.place}`;
        });

        routes.push({
          key,
          handler: klass.type.prototype[key],
          path:
            controllerMetadata.prefix +
            (requestMappingMetadata.path
              ? requestMappingMetadata.path.startsWith('/')
                ? requestMappingMetadata.path
                : '/' + requestMappingMetadata.path
              : ''),
          method: requestMappingMetadata.method,
          returnType: ReflectTool.getMetadata(
            RETURN_TYPE_METADATA_KEY,
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
