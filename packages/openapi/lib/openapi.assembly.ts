import { COMMON_METADATA, ReflectTool, UnknownTypeError } from '@novajs/common';
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
}
