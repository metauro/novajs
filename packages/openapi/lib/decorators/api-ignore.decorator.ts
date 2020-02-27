import { OPENAPI_METADATA } from '../constants';
import { ReflectTool } from '@novajs/common';

export function ApiIgnore() {
  return ReflectTool.createMixedDecorator(OPENAPI_METADATA.API_IGNORE, {
    disable: true,
  });
}
