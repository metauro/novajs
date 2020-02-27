import {
  Operation,
  OperationMetadata,
  Parameter,
  ParameterMetadata,
  PathItem,
  PathItemMetadata,
  RequestBody,
  Responses,
  SchemaMetadata,
  SecurityRequirement,
  Tag,
} from './interfaces';
import { omit, cloneDeep, merge } from 'lodash';
import { OPENAPI_METADATA } from './constants';
import { ReflectTool } from '@sojs/common';
import urljoin from 'url-join';

export class OpenApiExplorer {
  /**
   * @param target
   * @param operation
   * @returns api full path
   */
  static explorePath(target: Object, operation: Function): string {
    const pathItemMetadata = ReflectTool.getMetadata<PathItemMetadata>(
      OPENAPI_METADATA.API_PATH_ITEM,
      target,
    );
    const operationMetadata = ReflectTool.getMetadata<OperationMetadata>(
      OPENAPI_METADATA.API_OPERATION,
      operation,
    );

    return (
      urljoin(
        '/',
        pathItemMetadata ? pathItemMetadata.prefix : '',
        operationMetadata ? operationMetadata.path : '',
      )
        /**
         * most nodejs route define path variable such as :id, but openapi use {id}
         * need transform it
         */
        .replace(/:(.*)\/?/, (_, match) => {
          return `{${match}}`;
        })
    );
  }

  static explorePathItem(target: Object): PathItem {
    const pathItemMetadata = ReflectTool.getMetadata<PathItemMetadata>(
      OPENAPI_METADATA.API_PATH_ITEM,
      target,
    );

    return omit(pathItemMetadata, 'prefix');
  }

  static exploreOperation(target: Object, operation: Function): Operation {
    const operationMetadata = ReflectTool.getMetadata<OperationMetadata>(
      OPENAPI_METADATA.API_OPERATION,
      operation,
    );

    if (!operationMetadata) {
      return null;
    }

    return merge<any, Partial<Operation>>(
      omit(operationMetadata, 'method', 'path'),
      {
        tags: this.exploreTags(operation).map(t => t.name),
        security: this.exploreSecurity(operation),
        parameters: this.exploreRequestParameters(target, operation),
        requestBody: this.exploreRequestBody(target, operation),
        responses: this.exploreResponses(operation),
      },
    );
  }

  static exploreIsIgnore(target: Object): boolean {
    return !!ReflectTool.getMetadata(OPENAPI_METADATA.API_IGNORE, target);
  }

  static exploreRequestParameters(
    target: Object,
    operation: Function,
  ): Parameter[] {
    const result = [];
    const metadataList = (
      ReflectTool.getMetadata<ParameterMetadata[]>(
        OPENAPI_METADATA.API_REQUEST_PARAMETER,
        target,
        operation.name,
      ) || []
    ).filter(v => !!v);
    for (const metadata of metadataList) {
      if (metadata.schemas) {
        result.push(
          ...metadata.schemas.map(schema => ({
            ...omit(metadata, 'schemas'),
            schema,
          })),
        );
        result.push(...metadata.schemas);
      } else {
        result.push(cloneDeep(metadata));
      }
    }

    return result.filter(v => !!v);
  }

  static exploreRequestBody(target: Object, operation: Function): RequestBody {
    return (
      ReflectTool.getMetadata<RequestBody[]>(
        OPENAPI_METADATA.API_REQUEST_BODY,
        target,
        operation.name,
      ) || []
    ).filter(v => !!v)[0];
  }

  static exploreResponses(operation: Function): Responses {
    return ReflectTool.getMetadata(OPENAPI_METADATA.API_RESPONSES, operation);
  }

  static exploreSchema(target: Object, key?: string): SchemaMetadata {
    return Reflect.getMetadata(OPENAPI_METADATA.API_SCHEMA, target, key);
  }

  static exploreSecurity(target: Object): SecurityRequirement[] {
    return cloneDeep(
      ReflectTool.getMetadata(OPENAPI_METADATA.API_SECURITY, target) || [],
    );
  }

  static exploreTags(target: Object): Tag[] {
    return cloneDeep(
      ReflectTool.getMetadata(OPENAPI_METADATA.API_TAG, target) || [],
    );
  }
}
