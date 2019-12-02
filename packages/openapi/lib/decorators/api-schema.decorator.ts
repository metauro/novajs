import { merge } from 'lodash';
import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';
import { SchemaMetadata } from '../interfaces';

export function ApiSchema(metadata?: SchemaMetadata) {
  metadata = merge({ description: '' }, metadata);
  return (target: any, key?: string | symbol) => {
    if (key) {
      return ReflectTool.createPropertyDecorator(
        OPENAPI_METADATA.API_SCHEMA,
        metadata,
      )(target, key);
    }

    return ReflectTool.createClassDecorator(
      OPENAPI_METADATA.API_SCHEMA,
      metadata,
    )(target);
  };
}
