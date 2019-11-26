import path from 'path';
import isClass from 'is-class';
import { CORE_METADATA } from '@fastify-plus/core/dist/constants';
import { ControllerScanner } from '@fastify-plus/core/dist/scanners';
import { RequestDataMetadata } from '@fastify-plus/core/dist/interfaces';
import { COMMON_METADATA, ReflectTool } from '@fastify-plus/common';
import { Class } from 'utility-types';
import { SWAGGER_METADATA } from '../constants';

export class OpenApiScanner {
  static async scan(dir: string) {
    const tags = [];
    const paths = {};
    const definitions = {};
    for (const controller of await ControllerScanner.scan(dir)) {
      const cTags =
        Reflect.getMetadata(
          SWAGGER_METADATA.API_USE_TAGS,
          controller.klass.type,
        ) || {};
      tags.push(cTags);

      for (const route of controller.routes) {
        if (!paths[route.path]) {
          paths[route.path] = {};
        }

        route.params
          .filter(
            p =>
              isClass(p.type) &&
              !!Reflect.getMetadata(
                CORE_METADATA.REQUEST_DATA,
                controller.klass.type.prototype,
                route.key,
              ),
          )
          .forEach(p => {
            definitions[p.type.name] = {
              type: 'object',
              properties: Reflect.getMetadata(
                COMMON_METADATA.PROPERTIES,
                p.type.prototype,
              ).reduce((result, key) => {
                const m = Reflect.getMetadata(
                  SWAGGER_METADATA.API_MODEL_PROPERTY,
                  p.type.prototype,
                  key,
                );
                result[key] = {
                  ...this.convertType(
                    m.type ||
                      Reflect.getMetadata(
                        COMMON_METADATA.TYPE,
                        p.type.prototype,
                        key,
                      ),
                  ),
                  ...m,
                };
                return result;
              }, {}),
            };
          });

        paths[route.path][route.method.toLowerCase()] = {
          tags: [
            Reflect.getMetadata(SWAGGER_METADATA.API_USE_TAGS, route.handler) ||
              cTags,
          ],
          consumes: Reflect.getMetadata(
            SWAGGER_METADATA.API_CONSUMES,
            route.handler,
          ) || ['application/json'],
          produces: Reflect.getMetadata(
            SWAGGER_METADATA.API_PRODUCES,
            route.handler,
          ) || ['application/json'],
          responses: Reflect.getMetadata(
            SWAGGER_METADATA.API_RESPONSE,
            route.handler,
          ),
          parameters: (
            ReflectTool.getMetadata<RequestDataMetadata[]>(
              CORE_METADATA.REQUEST_DATA,
              controller.klass.type.prototype,
              route.key,
            ) || []
          ).map((m, i) => {
            if (!m) {
              return;
            }

            const type = ReflectTool.getMetadata<Function[]>(
              COMMON_METADATA.PARAM_TYPES,
              controller.klass.type.prototype,
              route.key,
            )[i];
            return {
              name: type.name,
              in:
                m.place === 'params'
                  ? 'path'
                  : m.place === 'headers'
                  ? 'header'
                  : m.place,
              description: '',
              required: true,
              schema: this.convertType(type),
            };
          }),
          ...Reflect.getMetadata(SWAGGER_METADATA.API_OPERATION, route.handler),
        };
      }
    }

    return {
      tags,
      paths,
      definitions,
    };
  }

  static convertType(type: Function | Class<any>) {
    if (isClass(type)) {
      return {
        $ref: `#/definitions/${type.name}`,
      };
    }

    const result = {
      type: type.name.toLowerCase(),
      format: undefined,
    };

    if (type === Date) {
      result.type = 'string';
      result.format = 'date-time';
    }

    return result;
  }
}

async function t() {
  // f.register(require('fastify-swagger'), {
  //   routePrefix: '/documentation',
  //   mode: 'static',
  //   exposeRoute: true,
  //   specification: {
  //     document: {
  //       swagger: '2.0',
  //       info: {
  //         description:
  //           'This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api useParamKey `special-useParamKey` to test the authorization     filters.',
  //         version: '1.0.0',
  //         title: 'Swagger Petstore',
  //         termsOfService: 'http://swagger.io/terms/',
  //         contact: {
  //           email: 'apiteam@swagger.io',
  //         },
  //         license: {
  //           name: 'Apache 2.0',
  //           url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
  //         },
  //       },
  //       host: 'petstore.swagger.io',
  //       basePath: '/v2',
  //       schemes: ['http', 'https'],
  //       ...(await OpenApiScanner.scan(path.resolve(__dirname, '..'))),
  //     },
  //   },
  // });
  // f.listen(3000);
}
