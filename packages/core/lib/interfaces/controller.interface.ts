import { OperationMetadata } from '@fastify-plus/openapi';
import { Klass } from '@fastify-plus/common';

export type ControllerRoute = {
  controller: Klass;
  handler: Function;
} & OperationMetadata;

export type ControllerRouteParam = {
  in?: 'path' | 'query' | 'header' | 'body' | 'cookie';
  name: string;
  inPath: string;
};
