import { Reference } from './index';
import { Operation, OperationMethod } from './operation.interface';
import { Server } from './server.interface';
import { Parameter } from './parameter.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#pathItemObject}
 */
export type PathItem = {
  $ref?: string;
  summary?: string;
  description?: string;
  servers?: Server[];
  parameters?: Array<Parameter | Reference>;
} & {
  [P in OperationMethod]?: Operation;
};

export type PathItemMetadata = {
  prefix: string;
} & PathItem;

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#pathsObject}
 */
export type Paths = Record<string, PathItem>;
