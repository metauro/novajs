import { Link, Reference, Responses } from './index';
import { Schema } from './schema.interface';
import { Parameter } from './parameter.interface';
import { Example } from './example.interface';
import { RequestBody } from './request.interface';
import { Header } from './header.interface';
import { SecuritySchema } from './security.interface';
import { Callback } from './callback.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#componentsObject}
 */
export type Components = {
  schemas?: Record<string, Schema | Reference>;
  responses?: Responses;
  parameters?: Record<string, Parameter | Reference>;
  examples?: Record<string, Example | Reference>;
  requestBodies?: Record<string, RequestBody | Reference>;
  headers?: Record<string, Header | Reference>;
  securitySchemes?: Record<string, SecuritySchema | Reference>;
  links?: Record<string, Link | Reference>;
  callbacks?: Record<string, Callback | Reference>;
};
