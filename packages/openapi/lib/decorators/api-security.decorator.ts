import { ReflectTool } from '@fastify-plus/common';
import { OPENAPI_METADATA } from '../constants';
import { SecurityRequirement } from '../interfaces';

/**
 * declare your api used security component
 // * use Bearer Token by default
 * @param metadata
 * @constructor
 */
export function ApiSecurity(metadata: SecurityRequirement = { bearer: [] }) {
  return ReflectTool.createMixedDecorator(
    OPENAPI_METADATA.API_SECURITY,
    metadata,
  );
}
