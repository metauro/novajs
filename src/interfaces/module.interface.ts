import { Resource } from './resource.interface';

export type Module = {
  exports: Map<any, any>;
} & Resource;
