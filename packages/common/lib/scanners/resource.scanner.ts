import * as fs from 'fs-extra';
import * as path from 'path';
import { Resource } from '../interfaces';

export class ResourceScanner {
  private static cache = new Map<string, Resource[]>();

  /**
   * scan all resources from dir, include sub dir
   * @param dir
   */
  static async scan(dir: string): Promise<Resource[]> {
    if (this.cache.get(dir)) {
      return this.cache.get(dir);
    }

    const result: Resource[] = [];
    const filenames = await fs.readdir(dir);

    // parallel scan sub resources
    await Promise.all(
      filenames.map(async filename => {
        const absolutePath = path.join(dir, filename);
        const parsedPath = path.parse(absolutePath);
        const stat = await fs.stat(absolutePath);

        if (stat.isDirectory()) {
          result.push(...(await ResourceScanner.scan(absolutePath)));
        } else {
          result.push({
            ...parsedPath,
            path: absolutePath,
            content: await fs.readFile(absolutePath, 'utf8'),
          });
        }
      }),
    );
    this.cache.set(dir, result);
    return result;
  }
}
