import isClass from 'is-class';
import { ModuleScanner } from './module.scanner';
import { Klass } from '../interfaces/klass.interface';

export class KlassScanner {
  public static async scan(dir: string): Promise<Klass[]> {
    return (await ModuleScanner.scan(dir)).reduce((result, module) => {
      for (const val of Object.values(module.exports)) {
        if (isClass(val)) {
          result.push({
            ...module,
            type: val,
          });
        }
      }

      return result;
    }, []);
  }
}
