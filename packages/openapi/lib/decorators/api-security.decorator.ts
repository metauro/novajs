import { ReflectTool } from '@fastify-plus/common';
import { OPENAPI_METADATA } from '../constants';
import { SecurityRequirement } from '../interfaces';

/**
 * declare your api used security component
 * use Bearer Token by default
 * @param metadata
 */
export function ApiSecurity(
  metadata: SecurityRequirement | SecurityRequirement[] = { bearer: [] },
) {
  return ReflectTool.createMixedDecorator<SecurityRequirement[]>(
    OPENAPI_METADATA.API_SECURITY,
    Array.isArray(metadata) ? metadata : [metadata],
  );
}
