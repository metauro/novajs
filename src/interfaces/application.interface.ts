import {
  FastifyInstance,
  ServerOptionsAsHttp,
  ServerOptionsAsHttp2,
  ServerOptionsAsSecureHttp,
  ServerOptionsAsSecureHttp2,
} from 'fastify';
import { ReflectiveInjector } from 'injection-js';

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
  injector: ReflectiveInjector;
} & ApplicationOptions;
