import { Reference } from './reference.interface';
import { Example } from './example.interface';
import { Encoding } from './encoding.interface';
import { Schema } from './schema.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#mediaTypeObject}
 */
export type MediaType = {
  schema?: Schema | Reference;
  example?: any;
  examples?: Record<string, Example | Reference>;
  encoding?: Record<string, Encoding>;
};
