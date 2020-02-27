import { isArray, mergeWith } from 'lodash';
import { Klass, ReflectTool } from '@sojs/common';
import {
  OpenApi,
  Operation,
  OperationMetadata,
  PathItem,
  Tag,
} from './interfaces';
import { OPENAPI_METADATA } from './constants';
import { OpenApiExplorer } from './openapi.explorer';

export class OpenApiScanner {
  /**
   * collect open api info
   * @param klasses
   */
  static scan(klasses: Klass[]): OpenApi {
    return {
      openapi: '3.0.3',
      info: {
        title: '',
        version: '',
      },
      servers: [],
      tags: this.scanTags(klasses),
      paths: this.scanPaths(klasses),
      components: {
        schemas: {},
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
    return klasses.reduce((result, k) => {
      result.push(...OpenApiExplorer.exploreTags(k.type));
      return result;
    }, []);
  }

  static scanPaths(klasses: Klass[]): Record<string, PathItem> {
    const result: Record<string, PathItem> = {};

    for (const { type } of klasses) {
      if (OpenApiExplorer.exploreIsIgnore(type)) {
        continue;
      }

      const operations: Function[] = ReflectTool.getOwnDecoratedFunctionKeys(
        type.prototype,
      )
        .filter(
          k =>
            !!ReflectTool.getMetadata<OperationMetadata>(
              OPENAPI_METADATA.API_OPERATION,
              type.prototype[k],
            ),
        )
        .map(k => type.prototype[k]);

      for (const operation of operations) {
        if (OpenApiExplorer.exploreIsIgnore(operation)) {
          continue;
        }

        const path = OpenApiExplorer.explorePath(type, operation);

        if (!result[path]) {
          result[path] = OpenApiExplorer.explorePathItem(type);
        }

        const operationMetadata = ReflectTool.getMetadata(
          OPENAPI_METADATA.API_OPERATION,
          operation,
        );
        result[path][operationMetadata.method] = mergeWith<
          Partial<Operation>,
          Operation
        >(
          {
            tags: OpenApiExplorer.exploreTags(type).map(t => t.name),
            security: OpenApiExplorer.exploreSecurity(type),
          },
          OpenApiExplorer.exploreOperation(type.prototype, operation),
          (objValue, srcValue) => {
            if (isArray(objValue) && objValue.length === 0) {
              return srcValue;
            }
          },
        );
      }
    }

    return result;
  }
}
