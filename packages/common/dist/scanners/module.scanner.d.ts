import { Module } from '../interfaces';
export declare class ModuleScanner {
  static scan(dir: string): Promise<Module[]>;
}
