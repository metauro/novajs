import { merge } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { Class } from 'utility-types';
import { ReflectTool } from '@fastify-plus/common';

export const ApiModelProperty = (
  metadata: {
    description?: string;
    required?: boolean;
    type?:
      | StringConstructor
      | NumberConstructor
      | BooleanConstructor
      | DateConstructor
      | Class<any>;
    isArray?: boolean;
    collectionFormat?: string;
    default?: any;
    enum?: Record<string, any>;
    format?: string;
    in?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    readOnly?: boolean;
    nullable?: boolean;
    xml?: any;
    example?: any;
  } = {},
) => {
  return ReflectTool.createPropertyDecorator(
    SWAGGER_METADATA.API_MODEL_PROPERTY,
    merge({}, metadata, {
      pattern: metadata.pattern ? metadata.pattern.source : undefined,
    }),
  );
};
