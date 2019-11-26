import { SWAGGER_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

export const ApiOAuth2Auth = (scopes?: string[]) =>
  ReflectTool.createMixedDecorator(
    SWAGGER_METADATA.API_OAUTH2,
    scopes ? scopes : [],
  );
