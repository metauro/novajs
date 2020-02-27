import { CORE_METADATA } from '../constants';
import { Klass, ReflectTool } from '@sojs/common';

export class ServiceScanner {
  static scan(klasses: Klass[]) {
    return klasses.filter(
      k => !!ReflectTool.getOwnMetadata(CORE_METADATA.SERVICE, k.type),
    );
  }
}
