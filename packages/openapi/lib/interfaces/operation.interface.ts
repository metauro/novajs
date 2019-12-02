import { Server } from './server.interface';
import { Parameter } from './parameter.interface';
import { ExternalDocument } from './external-document.interface';
import { RequestBody } from './request.interface';
import { Callback } from './callback.interface';
import { Reference } from './reference.interface';
import { Responses } from './response.interface';
import { SecurityRequirement } from './security.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#operationObject}
 */
export type Operation = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocument;
  operationId?: string;
  parameters?: Array<Parameter | Reference>;
  requestBody?: RequestBody;
  responses: Responses;
  callbacks?: Record<string, Callback | Reference>;
  deprecated?: boolean;
  security?: SecurityRequirement[];
  servers?: Server[];
};

export type OperationMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type OperationMetadata = {
  path: string;
  method: OperationMethod;
} & Operation;
