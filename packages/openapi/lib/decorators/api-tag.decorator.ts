import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';
import { Tag } from '../interfaces';

export function ApiTag(metadata: string | string[] | Tag | Tag[]) {
  return ReflectTool.createMixedDecorator<Tag[]>(
    OPENAPI_METADATA.API_TAG,
    (Array.isArray(metadata) ? metadata : [metadata]).map(m =>
      typeof m === 'string'
        ? {
            name: m,
          }
        : m,
    ),
  );
}
