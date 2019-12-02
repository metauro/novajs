import { PathItemMetadata } from '../interfaces';
import { ReflectTool } from '@fastify-plus/common';
import { OPENAPI_METADATA } from '../constants';

export function ApiPath(): ClassDecorator;
export function ApiPath(prefix: string): ClassDecorator;
export function ApiPath(metadata: PathItemMetadata): ClassDecorator;
export function ApiPath(prefixOrMetadata?: string | PathItemMetadata) {
  const metadata =
    typeof prefixOrMetadata === 'string'
      ? {
          prefix: prefixOrMetadata,
        }
      : prefixOrMetadata;

  return ReflectTool.createClassDecorator(
    OPENAPI_METADATA.API_PATH_ITEM,
    metadata,
  );
}
