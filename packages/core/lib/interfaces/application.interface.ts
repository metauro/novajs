import {
  FastifyInstance,
  ServerOptionsAsHttp,
  ServerOptionsAsHttp2,
  ServerOptionsAsSecureHttp,
  ServerOptionsAsSecureHttp2,
} from 'fastify';
import { ReflectiveInjector } from 'injection-js';
import { Klass } from '@fastify-plus/common';

export type ApplicationOptions = {
  appRootPath: string;
  fastifyOptions?:
    | ServerOptionsAsHttp
    | ServerOptionsAsSecureHttp
    | ServerOptionsAsHttp2
    | ServerOptionsAsSecureHttp2;
};

export type ApplicationContext = {
  http: FastifyInstance;
  klasses: Klass[];
  injector: ReflectiveInjector;
} & ApplicationOptions;
