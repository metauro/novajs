import urljoin from 'url-join';
import { isArray, merge, mergeWith, union } from 'lodash';
import { ClassTool, Klass, ReflectTool } from '@fastify-plus/common';
import {
  OperationMetadata,
  PathItem,
  PathItemMetadata,
  Schema,
  Tag,
} from './interfaces';
import { OPENAPI_METADATA } from './constants';
import { OpenApiAssembly } from './openapi.assembly';

export class OpenApiScanner {
  static scan(klasses: Klass[]) {
    return {
      tags: this.scanTags(klasses),
      paths: this.scanPaths(klasses),
      components: {
        schemas: this.scanSchemas(klasses),
        securitySchemes: {
          bearer: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    };
  }

  static scanTags(klasses: Klass[]): Tag[] {
    return klasses
      .map(k => ReflectTool.getOwnMetadata(OPENAPI_METADATA.API_TAG, k.type))
      .filter(v => !!v);
  }

  static scanSchemas(klasses: Klass[]): Record<string, Schema> {
    const result: Record<string, Schema> = {};

    for (const { type } of klasses) {
      const schema = {};

      // children should override parent
      for (const target of [type, ...ClassTool.getPrototypes(type)].reverse()) {
        mergeWith(
          schema,
          OpenApiAssembly.assembleSchema(target),
          (objValue, srcValue) => {
            if (isArray(objValue)) {
              return union(objValue.concat(srcValue));
            }
          },
        );
      }

      if (Object.keys(schema).length === 0) {
        continue;
      }

      result[type.name] = schema;
    }

    return result;
  }

  static scanPaths(klasses: Klass[]): Record<string, PathItem> {
    const result: Record<string, PathItem> = {};

    for (const { type } of klasses) {
      const pathItemMetadata = ReflectTool.getMetadata<PathItemMetadata>(
        OPENAPI_METADATA.API_PATH_ITEM,
        type,
      );

      for (const key of ReflectTool.getOwnDecoratedFunctionKeys(
        type.prototype,
      )) {
        const op = ReflectTool.getMetadata<OperationMetadata>(
          OPENAPI_METADATA.API_OPERATION,
          type.prototype[key],
        );

        if (!op) {
          continue;
        }

        const path = urljoin(
          '/',
          pathItemMetadata ? pathItemMetadata.prefix : '',
          op.path,
        );

        if (!result[path]) {
          result[path] = {};
        }

        merge(result[path], OpenApiAssembly.assemblePathItem(type, key));
      }
    }

    return result;
  }
}
