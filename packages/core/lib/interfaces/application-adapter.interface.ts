import { OperationMethod } from '@novajs/openapi';

export type ApplicationAdapterRouteOptions = {
  path: string;
  method: OperationMethod;
  handler: Function;
};
