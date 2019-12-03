import {
  COMMON_METADATA,
  ReflectTool,
  UnknownTypeError,
} from '@fastify-plus/common';
import { merge, omit } from 'lodash';
import {
  CookieParameterStyle,
  HeaderParameterStyle,
  MediaType,
  Parameter,
  PathParameterStyle,
  QueryParameterStyle,
  RequestBody,
  SchemaMetadata,
} from '../interfaces';
import { OPENAPI_METADATA } from '../constants';
import isClass from 'is-class';
import { FunctionAnalyzer } from '@fastify-plus/analyzer';
import { TypeTool } from '../tools';
import { Class } from 'utility-types';

function createApiRequestParameter<T>(
  place: 'header' | 'path' | 'query' | 'cookie',
) {
  return (
    metadata?:
      | string
      | (Omit<Parameter, 'in' | 'style' | 'name'> & {
          name?: string;
        } & { style?: T }),
  ) => {
    if (typeof metadata === 'string') {
      metadata = {
        name: metadata,
      };
    }

    const handleClass = (type: Class<any>) => {
      return ReflectTool.getOwnDecoratedKeys(type.prototype).reduce(
        (result, key) => {
          const schema = ReflectTool.getOwnMetadata<SchemaMetadata>(
            OPENAPI_METADATA.API_SCHEMA,
            type.prototype,
            key,
          );
          const propertyType = ReflectTool.getOwnMetadata(
            COMMON_METADATA.TYPE,
            type.prototype,
            key,
          );

          if (isClass(propertyType)) {
            result.push(...handleClass(propertyType));
          } else {
            result.push({
              name: key,
              required: (schema && schema.required) || true,
              in: place,
              schema: merge(
                TypeTool.getSchema(propertyType),
                schema ? omit(schema, 'required') : undefined,
              ),
            });
          }

          return result;
        },
        [],
      );
    };

    return ReflectTool.createParamDecorator<Parameter>(
      OPENAPI_METADATA.API_REQUEST_PARAMETER,
      (target, key, paramIndex) => {
        const type = ReflectTool.getOwnMetadata(
          COMMON_METADATA.PARAM_TYPES,
          target,
          key,
        )[paramIndex];

        // maximum stack size
        if (isClass(type)) {
          return handleClass(type);
        }

        return merge(
          {
            name: FunctionAnalyzer.getParamNames(target[key])[paramIndex],
            required: true,
            in: place,
            schema: TypeTool.getSchema(type),
          },
          metadata,
        ) as any;
      },
    );
  };
}

export const ApiRequestHeader = createApiRequestParameter<HeaderParameterStyle>(
  'header',
);

export const ApiRequestParam = createApiRequestParameter<PathParameterStyle>(
  'path',
);

export const ApiRequestQuery = createApiRequestParameter<QueryParameterStyle>(
  'query',
);

export const ApiRequestCookie = createApiRequestParameter<CookieParameterStyle>(
  'cookie',
);

export function ApiRequestBody(
  metadata?: {
    description?: string;
    contentType?: string;
    required?: boolean;
  } & Omit<MediaType, 'schema'>,
) {
  return ReflectTool.createParamDecorator<RequestBody>(
    OPENAPI_METADATA.API_REQUEST_BODY,
    (target, key, paramIndex) => {
      metadata = merge(
        {
          description: '',
          required: true,
        },
        metadata,
      );
      const { description, required, ...other } = metadata;
      const type = ReflectTool.getOwnMetadata(
        COMMON_METADATA.PARAM_TYPES,
        target,
        key,
      )[paramIndex];

      if (!type) {
        throw new UnknownTypeError(target, key, paramIndex);
      }

      const contentType =
        metadata.contentType || isClass(type)
          ? 'application/json'
          : 'text/plain';

      return {
        required: required || false,
        description: description || '',
        content: {
          [contentType]: {
            ...(contentType === 'text/plain'
              ? {}
              : {
                  schema: TypeTool.getSchema(type),
                }),
            ...other,
          },
        },
      } as any;
    },
  );
}
