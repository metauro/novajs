import { CORE_METADATA } from '../constants';
import { KlassScanner, ReflectTool } from '@fastify-plus/common';

export class ServiceScanner {
  static async scan(dir: string) {
    return (await KlassScanner.scan(dir)).filter(
      k =>
        k.infix === 'service' ||
        !!ReflectTool.getMetadata(CORE_METADATA.SERVICE, k.type),
    );
  }
}
