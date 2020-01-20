import { OperationMetadata } from '@fastify-plus/openapi';
import { Klass } from '@fastify-plus/common';

export type ControllerRoute = {
  controller: Klass;
  key: string;
  handler: Function;
} & OperationMetadata;
