import { OperationMetadata } from '@novajs/openapi';
import { Klass } from '@novajs/common';

export type ControllerRoute = {
  controller: Klass;
  handler: Function;
} & OperationMetadata;

export type ControllerRouteParam = {
  in?: 'path' | 'query' | 'header' | 'body' | 'cookie';
  name: string;
  inPath: string;
};
