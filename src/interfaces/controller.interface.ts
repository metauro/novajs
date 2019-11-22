import { Class } from 'utility-types';
import { RequestMappingMetadata } from './request-mapping.interface';
import { Klass } from './klass.interface';

export type ControllerOptions = {
  prefix?: string;
};

export type ControllerMetadata = {
  prefix: string;
};

export type ControllerParam = {
  key: string;
  type: Class<any>;
};

export type ControllerRoute = {
  key: string;
  handler: Function;
  params: ControllerParam[];
  returnType?: Class<any>;
} & RequestMappingMetadata;

export type Controller = {
  klass: Klass;
  routes: ControllerRoute[];
};
