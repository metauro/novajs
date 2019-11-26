import { ReflectTool } from '@fastify-plus/common';
import { ControllerOptions } from '../interfaces';
import { CORE_METADATA } from '../constants';

export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(
  prefixOrOptions?: string | ControllerOptions,
): ClassDecorator {
  let prefix = prefixOrOptions
    ? typeof prefixOrOptions === 'string'
      ? prefixOrOptions
      : prefixOrOptions.prefix
    : '';

  if (!prefix.startsWith('/')) {
    prefix = '/' + prefix;
  }

  return ReflectTool.createClassDecorator(CORE_METADATA.CONTROLLER, {
    prefix,
  });
}
