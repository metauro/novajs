import { Klass, ReflectTool } from '@fastify-plus/common';
import { CORE_METADATA } from '../constants';

export class ControllerScanner {
  static scan(klasses: Klass[]): Klass[] {
    return klasses.filter(
      k => !!ReflectTool.getMetadata(CORE_METADATA.CONTROLLER, k.type),
    );
  }
}
