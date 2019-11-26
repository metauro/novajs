import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiImplicitFile = (metadata: {
  name: string;
  description?: string;
  required?: boolean;
}) =>
  ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_IMPLICIT_FILE,
    merge(
      {
        in: 'formData',
        type: 'file',
        description: '',
        required: false,
      },
      metadata,
      metadata,
    ),
  );
