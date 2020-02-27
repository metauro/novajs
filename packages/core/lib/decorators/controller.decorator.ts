import { ReflectTool } from '@sojs/common';
import { ApiPath, PathItemMetadata } from '@sojs/openapi';
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
