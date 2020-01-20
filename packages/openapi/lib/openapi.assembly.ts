import {
  COMMON_METADATA,
  ReflectTool,
  UnknownTypeError,
} from '@fastify-plus/common';
import { merge, omit } from 'lodash';
import {
  OperationMetadata,
  Parameter,
  PathItem,
  RequestBody,
  Responses,
  Schema,
  SchemaMetadata,
  SecurityRequirement,
  Tag,
} from './interfaces';
import { OPENAPI_METADATA } from './constants';
import { Class } from 'utility-types';
import { TypeTool } from './tools';

export class OpenApiAssembly {
  static assembleSchema(type: Class<any>): Schema | undefined {
    const classSchema = ReflectTool.getOwnMetadata<Schema | undefined>(
      OPENAPI_METADATA.API_SCHEMA,
      type,
    );
    const propertySchemas: Array<{
      key: string;
      schema: SchemaMetadata | undefined;
    }> = ReflectTool.getOwnDecoratedProperties(type.prototype).map(key => ({
      key,
      schema: ReflectTool.getOwnMetadata<SchemaMetadata>(
        OPENAPI_METADATA.API_SCHEMA,
        type.prototype,
        key,
      ),
    }));

    if (
      // class not use ApiSchema decorator
      !classSchema &&
      // class properties not use ApiSchema decorator
      (propertySchemas.length === 0 || propertySchemas.every(p => !p.schema))
    ) {
      return;
    }

    const required: string[] = [];

    return merge(
      {
        title: type.name,
        type: 'object',
        required,
        properties: propertySchemas.reduce((properties, { key, schema }) => {
          const propertyType = ReflectTool.getOwnMetadata(
            COMMON_METADATA.TYPE,
            type.prototype,
            key,
          );

          if (!propertyType) {
            throw new UnknownTypeError(type, key);
          }

          if (!schema || schema.required !== false) {
            required.push(key);
          }

          properties[key] = merge(
            {},
            TypeTool.getSchema(propertyType),
            omit(schema, 'required'),
          );
          return properties;
        }, {}),
      },
      classSchema,
    );
  }

  static assembleRequestParams(
    type: Class<any>,
    key: string | symbol,
  ): Parameter[] | undefined {
    return (
      ReflectTool.getOwnMetadata(
        OPENAPI_METADATA.API_REQUEST_PARAMETER,
        type.prototype,
        key,
      ) || []
    )
      .filter(v => !!v)
      .reduce((result, item) => {
        if (item.schemas) {
          result.push(...item.schemas);
        } else {
          result.push(item);
        }

        return result;
      }, []);
  }

  static assembleRequestBody(
    type: Class<any>,
    key: string | symbol,
  ): RequestBody | undefined {
    return (
      ReflectTool.getOwnMetadata<RequestBody[]>(
        OPENAPI_METADATA.API_REQUEST_BODY,
        type.prototype,
        key,
      ) || []
    ).filter(v => !!v)[0];
  }

  static assembleResponses(type: Class<any>, key: string | symbol): Responses {
    return (
      ReflectTool.getOwnMetadata(
        OPENAPI_METADATA.API_RESPONSES,
        type.prototype[key],
      ) || {}
    );
  }

  static assembleOperation(
    type: Class<any>,
    key: string | symbol,
  ): OperationMetadata | undefined {
    const op = omit(
      ReflectTool.getOwnMetadata<OperationMetadata>(
        OPENAPI_METADATA.API_OPERATION,
        type.prototype[key],
      ),
    );

    if (!op) {
      return;
    }

    const tag: Tag = ReflectTool.getOwnMetadata(
      OPENAPI_METADATA.API_TAG,
      type.prototype[key],
    ) ||
      ReflectTool.getMetadata(OPENAPI_METADATA.API_TAG, type) || {
        name: type.name,
      };
    const security: SecurityRequirement =
      ReflectTool.getOwnMetadata(
        OPENAPI_METADATA.API_SECURITY,
        type.prototype[key],
      ) || ReflectTool.getMetadata(OPENAPI_METADATA.API_SECURITY, type);

    return {
      ...op,
      tags: [tag.name],
      responses: this.assembleResponses(type, key),
      requestBody: this.assembleRequestBody(type, key),
      parameters: this.assembleRequestParams(type, key),
      security: security ? [security] : undefined,
    };
  }

  static assemblePathItem(type: Class<any>, key: string | symbol): PathItem {
    const result: PathItem = {};

    const op = this.assembleOperation(type, key);

    if (op) {
      result[op.method] = omit(op, 'method', 'path');
    }

    merge(
      result,
      ReflectTool.getMetadata(OPENAPI_METADATA.API_PATH_ITEM, type),
    );

    return omit(result, 'prefix');
  }
}
