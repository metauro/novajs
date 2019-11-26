import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiBearerAuth = () =>
  ReflectTool.createMixedDecorator(SWAGGER_METADATA.API_BEARER_AUTH, []);
