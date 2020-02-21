import { ResourceScanner } from './resource.scanner';
import { Module } from '../interfaces';
import { EnvTool } from '../tools';

export class ModuleScanner {
  static async scan(dir: string): Promise<Module[]> {
    const resources = await ResourceScanner.scan(dir);
    const ext = EnvTool.inTsEnv() ? '.ts' : '.js';

    return Promise.all(
      resources
        .filter(resource => resource.ext === ext)
        .map(async resource => ({
          ...resource,
          exports: await import(resource.path),
        })),
    );
  }
}
