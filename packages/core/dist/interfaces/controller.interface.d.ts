import { Class } from 'utility-types';
import { RequestMappingMetadata } from './request-mapping.interface';
import { Klass } from '@fastify-plus/common';
export declare type ControllerOptions = {
  prefix?: string;
};
export declare type ControllerMetadata = {
  prefix: string;
};
export declare type ControllerParam = {
  useParamKey: string;
  type: Class<any>;
};
export declare type ControllerRoute = {
  key: string;
  handler: Function;
  params: ControllerParam[];
  returnType?: Class<any>;
} & RequestMappingMetadata;
export declare type Controller = {
  klass: Klass;
  routes: ControllerRoute[];
};
