import { ReflectTool } from '@novajs/common';
import { ApiPath, PathItemMetadata } from '@novajs/openapi';
import { CORE_METADATA } from '../constants';

export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(metadata: PathItemMetadata): ClassDecorator;
export function Controller(
  prefixOrMetadata?: string | PathItemMetadata,
): ClassDecorator {
  return target => {
    ReflectTool.createClassDecorator(CORE_METADATA.CONTROLLER, {})(target);
    return ApiPath(prefixOrMetadata as any)(target);
  };
}
