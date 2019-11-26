import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiIgnoreDecorator = () =>
  ReflectTool.createMixedDecorator(SWAGGER_METADATA.API_IGNORE, {
    disable: true,
  });
