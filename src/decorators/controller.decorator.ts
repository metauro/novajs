import { ControllerMetadata, ControllerOptions } from '../interfaces';
import { ReflectTool } from '../tools';
import { CONTROLLER_METADATA_KEY } from '../constants';

export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(
  prefixOrOptions?: string | ControllerOptions,
): ClassDecorator {
  return <T extends Function>(target: T): T => {
    let prefix = prefixOrOptions
      ? typeof prefixOrOptions === 'string'
        ? prefixOrOptions
        : prefixOrOptions.prefix
      : '';

    if (!prefix.startsWith('/')) {
      prefix = '/' + prefix;
    }

    ReflectTool.defineMetadata<ControllerMetadata>(
      CONTROLLER_METADATA_KEY,
      {
        prefix,
      },
      target,
    );

    return target;
  };
}
