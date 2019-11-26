import fastifySwagger from 'fastify-swagger';
import { merge } from 'lodash';
import { FastifyPlusApplication } from '@fastify-plus/core';

export class DocumentBuilder {
  static create(app: FastifyPlusApplication) {
    return new DocumentBuilder(app);
  }

  protected document: any = {
    info: {},
    host: '',
    basePath: '',
    schemas: ['http'],
  };

  constructor(protected readonly app: FastifyPlusApplication) {}

  setInfo(info: {
    title?: string;
    description?: string;
    version?: string;
    termsOfService?: string;
    contact?: {
      name?: string;
      url?: string;
      email?: string;
    };
    license?: {
      name?: string;
      url?: string;
    };
  }) {
    this.document.info = merge(
      {
        title: '',
        description: '',
        version: '',
      },
      info,
    );
  }

  setHost(host: string) {
    this.document.host = host;
    return this;
  }

  setBasePath(basePath: string) {
    this.document.basePath = basePath;
    return this;
  }

  setSchemas(schemas: Array<'http' | 'https' | string>) {
    this.document.schemas = schemas;
    return this;
  }

  build() {
    this.app.getFastifyInstance().register(fastifySwagger, this.document);
  }
}
