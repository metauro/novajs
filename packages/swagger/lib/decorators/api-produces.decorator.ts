import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiProduces = (...mimeTypes: string[]) =>
  ReflectTool.createMixedDecorator(SWAGGER_METADATA.API_PRODUCES, mimeTypes);
