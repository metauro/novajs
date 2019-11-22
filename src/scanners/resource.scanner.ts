import * as fs from 'fs-extra';
import * as path from 'path';
import { Resource } from '../interfaces';

export class ResourceScanner {
  private static cache = new Map<string, Resource[]>();

  public static async scan(dir: string): Promise<Resource[]> {
    if (this.cache.get(dir)) {
      return this.cache.get(dir);
    }

    const result: Resource[] = [];

    for (const name of await fs.readdir(dir)) {
      const absolutePath = path.join(dir, name);
      const parsedPath = path.parse(absolutePath);
      const stat = await fs.stat(absolutePath);
      const isDir = stat.isDirectory();
      const filenameSplit = isDir ? null : parsedPath.base.split('.');

      if (isDir) {
        result.push(...(await ResourceScanner.scan(absolutePath)));
      } else {
        result.push({
          ...parsedPath,
          path: absolutePath,
          infix:
            filenameSplit && filenameSplit.length > 2
              ? filenameSplit[filenameSplit.length - 2]
              : null,
          suffix: parsedPath.ext.slice(1),
          content: await fs.readFile(absolutePath, 'utf8'),
        });
      }
    }
    this.cache.set(dir, result);
    return result;
  }

  /**
   * scan resources filter by infix
   * @param infix - file infix
   * @param dir - search dir
   */
  public static async scanByInfix(dir: string, infix: string) {
    return (await ResourceScanner.scan(dir)).filter(
      resource => resource.infix === infix,
    );
  }

  /**
   * scan resources filter by suffix
   * @param suffix - file suffix
   * @param dir - search dir
   */
  public static async scanBySuffix(dir: string, suffix: string) {
    suffix = suffix.startsWith('.') ? suffix : '.' + suffix;
    return (await ResourceScanner.scan(dir)).filter(
      resource => resource.ext === suffix,
    );
  }
}
