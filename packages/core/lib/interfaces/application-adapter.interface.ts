import { OperationMethod } from '@fastify-plus/openapi';

export type ApplicationAdapterRouteOptions = {
  path: string;
  method: OperationMethod;
  handler: Function;
};
