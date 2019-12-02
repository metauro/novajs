import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';
import { Tag } from '../interfaces';

export function ApiTag(metadata: string | Tag) {
  return ReflectTool.createMixedDecorator<Tag>(
    OPENAPI_METADATA.API_TAG,
    typeof metadata === 'string'
      ? {
          name: metadata,
        }
      : metadata,
  );
}
