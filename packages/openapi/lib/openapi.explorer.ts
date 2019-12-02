import { merge } from 'lodash';
import { Info, OpenApi } from './interfaces';

export class OpenApiExplorer {
  static create() {
    return new OpenApiExplorer();
  }

  protected openApi: OpenApi = {
    openapi: '3.0.2',
    info: {
      title: '',
      description: '',
      version: '1.0.0',
    },
    servers: [],
    paths: {},
    components: {
      schemas: {},
      responses: {},
      parameters: {},
      examples: {},
      requestBodies: {},
      headers: {},
      securitySchemes: {},
      links: {},
      callbacks: {},
    },
    security: [],
    tags: [],
  };

  setInfo(info: Info) {
    merge(this.openApi.info, info);
    return this;
  }

  getOpenApi() {
    return this.openApi;
  }
}
