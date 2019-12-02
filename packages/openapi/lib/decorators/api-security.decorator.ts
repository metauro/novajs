import { ReflectTool } from '@fastify-plus/common';
import { OPENAPI_METADATA } from '../constants';
import { SecurityRequirement } from '../interfaces';

export function ApiSecurity(metadata: SecurityRequirement = { bearer: [] }) {
  return ReflectTool.createMixedDecorator(
    OPENAPI_METADATA.API_SECURITY,
    metadata,
  );
}
