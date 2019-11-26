import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { Class } from 'utility-types';
import { ReflectTool } from '@fastify-plus/common';

export const ApiImplicitQuery = (metadata: {
  name: string;
  description?: string;
  required?: boolean;
  type?: StringConstructor | NumberConstructor | Class<any>;
  isArray?: boolean;
  enum?: Record<string, any>;
  collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
}) =>
  ReflectTool.createMethodDecorator(
    SWAGGER_METADATA.API_IMPLICIT_QUERY,
    merge(
      {
        in: 'query',
        description: '',
        required: false,
        isArray: false,
        collectionFormat: 'multi',
      },
      metadata,
      metadata.isArray && {
        type: Array,
        items: metadata.enum
          ? {
              type: String,
              enum: metadata.enum,
            }
          : {
              type: metadata.type,
            },
      },
    ),
  );
