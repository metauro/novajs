import { ResourceScanner } from './resource.scanner';
import { Module } from '../interfaces';

export class ModuleScanner {
  public static async scan(dir: string): Promise<Module[]> {
    const resources = await ResourceScanner.scan(dir);

    return Promise.all(
      resources
        .filter(resource => resource.suffix === 'js')
        .map(async resource => ({
          ...resource,
          exports: await import(resource.path),
        })),
    );
  }
}
