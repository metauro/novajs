import { Discriminator } from './discriminator.interface';
import { XML } from './xml.interface';
import { ExternalDocument } from './external-document.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject}
 */
export type Schema = {
  type?: 'integer' | 'number' | 'string' | 'boolean' | 'object' | 'array';
  format?:
    | 'int32'
    | 'int64'
    | 'float'
    | 'double'
    | 'byte'
    | 'binary'
    | 'date'
    | 'date-time'
    | 'password'
    // extend format for ajv
    | 'time'
    | 'uri'
    | 'uri-reference'
    | 'uri-template'
    | 'email'
    | 'hostname'
    | 'ipv4'
    | 'ipv6'
    | 'regex'
    | 'uuid'
    | 'json-pointer'
    | 'relative-json-pointer'
    | string;
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  not?: Schema;
  items?: Schema | Schema[];
  properties?: Record<string, Schema>;
  additionalProperties?: Schema | boolean;
  description?: string;
  default?: any;
  nullable?: boolean;
  discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XML;
  externalDocs?: ExternalDocument;
  example?: any;
  deprecated?: boolean;
};

export type SchemaMetadata = Omit<
  Schema,
  | 'required'
  | 'allOf'
  | 'oneOf'
  | 'anyOf'
  | 'ont'
  | 'items'
  | 'properties'
  | 'additionalProperties'
> & {
  required?: boolean;
  allOf?: SchemaMetadata[];
  oneOf?: SchemaMetadata[];
  anyOf?: SchemaMetadata[];
  not?: SchemaMetadata;
  items?: SchemaMetadata | SchemaMetadata[];
  properties?: Record<string, SchemaMetadata>;
  additionalProperties?: SchemaMetadata | boolean;
};
