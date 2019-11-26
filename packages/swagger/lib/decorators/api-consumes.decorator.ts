import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiConsumes = (...mimeTypes: string[]) =>
  ReflectTool.createMixedDecorator(SWAGGER_METADATA.API_CONSUMES, mimeTypes);
