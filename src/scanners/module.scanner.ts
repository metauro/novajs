import { ResourceScanner } from './resource.scanner';
import { Module } from '../interfaces';

export class ModuleScanner {
  public static async scan(dir: string): Promise<Module[]> {
    const resources = await ResourceScanner.scan(dir);
    const fileType = process.env._.includes('ts-node') ? 'ts' : 'js';

    return Promise.all(
      resources
        .filter(resource => resource.suffix === fileType)
        .map(async resource => ({
          ...resource,
          exports: await import(resource.path),
        })),
    );
  }
}
