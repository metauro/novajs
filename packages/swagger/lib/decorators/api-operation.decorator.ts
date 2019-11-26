import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiOperation = (metadata: {
  summary?: string;
  description?: string;
  operationId?: string;
  deprecated?: boolean;
}) =>
  ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_OPERATION,
    merge(
      {
        summary: '',
        description: '',
        deprecated: false,
      },
      metadata,
    ),
  );
