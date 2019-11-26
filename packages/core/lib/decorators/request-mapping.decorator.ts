import {
  RequestMappingMetadata,
  RequestMappingOptions,
  RequestMethod,
} from '../interfaces';
import { CORE_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

const RequestMapping = (options: RequestMappingOptions): MethodDecorator => {
  return ReflectTool.createMethodDecorator<RequestMappingMetadata>(
    CORE_METADATA.REQUEST_MAPPING,
    {
      path: options.path || '',
      method: options.method || 'GET',
    },
  );
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
