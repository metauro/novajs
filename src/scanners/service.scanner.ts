import { KlassScanner } from './klass.scanner';
import { ReflectTool } from '../tools';
import { SERVICE_METADATA_KEY } from '../constants';
import { Klass } from '../interfaces/klass.interface';

export class ServiceScanner {
  static async async(dir: string): Promise<Klass[]> {
    return (await KlassScanner.scan(dir)).filter(
      k =>
        k.infix === 'service' ||
        !!ReflectTool.getMetadata(SERVICE_METADATA_KEY, k.type),
    );
  }
}
