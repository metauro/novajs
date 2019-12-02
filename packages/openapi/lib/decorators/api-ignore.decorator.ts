import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export function ApiIgnore() {
  return ReflectTool.createMixedDecorator(OPENAPI_METADATA.API_IGNORE, {
    disable: true,
  });
}
