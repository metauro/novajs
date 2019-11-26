import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiImplicitHeaders = (
  headers:
    | {
        name: string;
        description?: string;
        required?: boolean;
      }
    | Array<{
        name: string;
        description?: string;
        required?: boolean;
      }>,
): MethodDecorator => {
  if (!Array.isArray(headers)) {
    headers = [headers];
  }
  return ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_IMPLICIT_HEADER,
    headers.map(m =>
      merge(
        {
          in: 'header',
          description: '',
          required: false,
          type: String,
        },
        m,
      ),
    ),
  );
};
