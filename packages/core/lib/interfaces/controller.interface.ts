import { OperationMetadata } from '@novajs/openapi';
import { Klass } from '@novajs/common';
import { JSONSchema6 } from 'json-schema';

export type ControllerRoute = {
  controller: Klass;
  handler: (...args: any[]) => any;
  injectedHandler: (...args: any[]) => any;
  nodeStylePath: string;
  schema: {
    body?: JSONSchema6;
    querystring?: JSONSchema6;
    params?: JSONSchema6;
    headers?: JSONSchema6;
  };
} & OperationMetadata;

export type ControllerRouteParam = {
  in?: 'path' | 'query' | 'header' | 'body' | 'cookie';
  name: string;
  inPath: string;
};
