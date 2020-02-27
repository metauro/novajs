import { OperationMethod } from '@sojs/openapi';
import { JSONSchema6 } from 'json-schema';

export type ApplicationAdapterRouteOptions = {
  path: string;
  method: OperationMethod;
  handler: Function;
  schema: {
    body?: JSONSchema6;
    querystring?: JSONSchema6;
    params?: JSONSchema6;
    headers?: JSONSchema6;
  };
};
