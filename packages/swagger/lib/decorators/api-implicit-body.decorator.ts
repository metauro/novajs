import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { Class } from 'utility-types';
import { ReflectTool } from '@fastify-plus/common';

export const ApiImplicitBody = (metadata: {
  name: string;
  type?: Class<any>;
  description?: string;
  required?: boolean;
  isArray?: boolean;
}) =>
  ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_IMPLICIT_BODY,
    merge(
      {
        in: 'body',
        description: '',
        required: false,
        isArray: false,
      },
      metadata,
    ),
  );
