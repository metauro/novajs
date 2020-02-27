import fastifySwagger from 'fastify-swagger';
import expressSwagger from 'swagger-ui-express';
import yaml from 'js-yaml';
import { defaults, merge } from 'lodash';
import { Application } from '@sojs/core';
import { Info, OpenApi, OpenApiScanner, Responses } from '@sojs/openapi';
import { LoggerService, ObjectTool } from '@sojs/common';
import { FastifyApplicationAdapter } from '@sojs/platform-fastify';
import { ExpressApplicationAdapter } from '@sojs/platform-express';

export class DocumentBuilder {
  private static logger = new LoggerService(`swagger ${DocumentBuilder.name}`);

  static create(app: Application) {
    return new DocumentBuilder(app);
  }

  protected document: OpenApi & {
    host: string;
    basePath: string;
    schemes: string[];
  } = {
    openapi: '',
    info: {
      title: '',
      version: '',
    },
    components: {},
    paths: {},
    host: '',
    basePath: '',
    schemes: ['http', 'https'],
  };

  protected hasGlobalResponses = false;

  constructor(protected readonly app: Application) {
    const { klasses } = app.getContext();
    merge(this.document, OpenApiScanner.scan(klasses));
    this.resetNonsupportFormat();
  }

  private resetNonsupportFormat() {
    const nonsupportFormats = [
      'time',
      'uri',
      'uri-reference',
      'uri-template',
      'email',
      'hostname',
      'ipv4',
      'ipv6',
      'regex',
      'uuid',
      'json-pointer',
      'relative-json-pointer',
    ];

    ObjectTool.walk(this.document, (key, val, obj) => {
      if (key === 'format' && nonsupportFormats.includes(val)) {
        delete obj[key];
      }
    });
  }

  setInfo(info: Info) {
    merge(this.document, info);
    return this;
  }

  setHost(host: string) {
    this.document.host = host;
    return this;
  }

  setBasePath(basePath: string) {
    this.document.basePath = basePath;
    return this;
  }

  setSchemes(schemes: Array<'http' | 'https' | string>) {
    this.document.schemes = schemes;
    return this;
  }

  setGlobalResponses(responses: Responses) {
    this.hasGlobalResponses = true;
    Object.keys(this.document.paths).forEach(path => {
      const pathItem = this.document.paths[path];
      Object.keys(pathItem).forEach(method => {
        const operation = pathItem[method];
        defaults(operation.responses, responses);
      });
    });
    return this;
  }

  build() {
    if (!this.hasGlobalResponses) {
      this.setGlobalResponses({
        '404': {
          description: 'Resource Not Found',
        },
        '405': {
          description: 'Method Not Allow',
        },
      });
    }

    const docsPath = '/api-docs';
    const jsonPath = '/api-json';
    const yamlPath = '/api-yaml';
    const jsonDoc = this.document;
    const yamlDoc = yaml.dump(this.document);
    const { adapter } = this.app.getContext();

    DocumentBuilder.logger.info(`map swagger document to ${docsPath}`);
    DocumentBuilder.logger.info(`map swagger json to ${jsonPath}`);
    DocumentBuilder.logger.info(`map swagger yaml to ${yamlPath}`);

    if (adapter instanceof FastifyApplicationAdapter) {
      adapter.server.register(fastifySwagger as any, {
        mode: 'static',
        specification: {
          document: this.document,
        },
        exposeRoute: true,
        routePrefix: docsPath,
      });
      adapter.server.route({
        method: 'GET',
        url: jsonPath,
        handler: (req, reply) => {
          reply.header('Content-Type', 'application/json').send(jsonDoc);
        },
      });
      adapter.server.route({
        method: 'GET',
        url: yamlPath,
        handler: (req, reply) => {
          reply.header('Content-Type', 'text/x-yaml').send(yamlDoc);
        },
      });
    } else if (adapter instanceof ExpressApplicationAdapter) {
      adapter.server.use(
        docsPath,
        expressSwagger.serve,
        expressSwagger.setup(this.document),
      );
      adapter.server.get(jsonPath, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonDoc);
      });
      adapter.server.get(yamlPath, (req, res) => {
        res.setHeader('Content-Type', 'text/x-yaml');
        res.send(yamlDoc);
      });
    }
  }
}
