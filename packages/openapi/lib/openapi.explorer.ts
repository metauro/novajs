import {
  OperationMetadata,
  ParameterMetadata,
  PathItemMetadata,
  RequestBody,
  Responses,
  SchemaMetadata,
  SecurityRequirement,
  Tag,
} from './interfaces';
import { OPENAPI_METADATA } from './constants';

export class OpenApiExplorer {
  static create() {
    return new OpenApiExplorer();
  }

  static exploreIsIgnore<T extends Object>(target: T, key?: keyof T): boolean {
    return !!Reflect.getMetadata(OPENAPI_METADATA.API_IGNORE, target, key);
  }

  static exploreOperation(target: Function): OperationMetadata {
    return Reflect.getMetadata(OPENAPI_METADATA.API_OPERATION, target);
  }

  static explorePath(target: Object): PathItemMetadata {
    return Reflect.getMetadata(OPENAPI_METADATA.API_PATH_ITEM, target);
  }

  static exploreRequestParameters(
    target: Object,
    key: string,
  ): ParameterMetadata[] {
    return (
      Reflect.getMetadata(
        OPENAPI_METADATA.API_REQUEST_PARAMETER,
        target,
        key,
      ) || []
    );
  }

  static exploreRequestBodies(target: Object, key: string): RequestBody[] {
    return (
      Reflect.getMetadata(OPENAPI_METADATA.API_REQUEST_BODY, target, key) || []
    );
  }

  static exploreResponses(target: Function): Responses {
    return Reflect.getMetadata(OPENAPI_METADATA.API_RESPONSES, target);
  }

  static exploreSchema(target: Object, key?: string): SchemaMetadata {
    return Reflect.getMetadata(OPENAPI_METADATA.API_SCHEMA, target, key);
  }

  static exploreSecurity<T extends Object>(
    target: T,
    key?: keyof T,
  ): SecurityRequirement {
    return Reflect.getMetadata(OPENAPI_METADATA.API_SECURITY, target, key);
  }

  static exploreTag<T extends Object>(target: T, key?: keyof T): Tag {
    return Reflect.getMetadata(OPENAPI_METADATA.API_TAG, target, key);
  }
}
