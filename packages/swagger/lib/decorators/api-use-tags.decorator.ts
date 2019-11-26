import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiUseTags = (
  ...metadata: Array<string | { name: string; description?: string }>
) =>
  ReflectTool.createMixedDecorator(
    SWAGGER_METADATA.API_USE_TAGS,
    metadata.map(m =>
      typeof metadata === 'string'
        ? {
            name: m,
          }
        : m,
    ),
  );
