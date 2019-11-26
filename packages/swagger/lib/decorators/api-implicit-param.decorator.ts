import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiImplicitParam = (metadata: {
  name: string;
  description?: string;
  required?: boolean;
  enum?: Record<string, any>;
  type?: 'String' | 'Number' | 'Boolean' | any;
}) =>
  ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_IMPLICIT_PARAM,
    merge(
      {
        in: 'path',
        description: '',
        required: false,
      },
      metadata,
      {
        type: metadata.enum ? String : metadata.type,
      },
    ),
  );
