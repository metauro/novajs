import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export function ApiOAuth2(scopes: string[] = []) {
  return ReflectTool.createMixedDecorator(OPENAPI_METADATA.API_OAUTH2, scopes);
}
