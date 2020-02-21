import { Resource } from './resource.interface';

export type Module = {
  /**
   * export variable reference
   */
  exports: Map<any, any>;
} & Resource;
