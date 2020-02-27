import { ReflectiveInjector } from 'injection-js';
import { Klass, LogLevel } from '@fastify-plus/common';
import { ApplicationAdapter } from '../adapter';
import { OpenApi } from '@fastify-plus/openapi';

export type ApplicationOptions = {
  appRootPath: string;
  adapter: ApplicationAdapter;
  logLevel?: LogLevel;
};

export type ApplicationContext = {
  klasses: Klass[];
  injector: ReflectiveInjector;
  openApi: OpenApi;
} & Required<ApplicationOptions>;
