import { ReflectTool } from '../tools';
import {
  RequestMappingMetadata,
  RequestMappingOptions,
  RequestMethod,
} from '../interfaces';
import { REQUEST_MAPPING_METADATA_KEY } from '../constants';

const RequestMapping = (options: RequestMappingOptions): MethodDecorator => {
  return (target, propertyKey) => {
    ReflectTool.defineMetadata<RequestMappingMetadata>(
      REQUEST_MAPPING_METADATA_KEY,
      {
        path: options.path || '',
        method: options.method || 'GET',
      },
      target,
      propertyKey,
    );
    return target;
  };
};

const createRequestMapping = (method: RequestMethod) => (
  path?: string,
): MethodDecorator => {
  return RequestMapping({
    path,
    method,
  });
};

export const Get = createRequestMapping('GET');

export const Post = createRequestMapping('POST');

export const Put = createRequestMapping('PUT');

export const Patch = createRequestMapping('PATCH');

export const Delete = createRequestMapping('DELETE');

export const Head = createRequestMapping('HEAD');

export const Options = createRequestMapping('OPTIONS');
