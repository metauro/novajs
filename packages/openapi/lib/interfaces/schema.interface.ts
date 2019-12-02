import { DataTypeFormat } from './data-types.interface';
import { Discriminator } from './discriminator.interface';
import { XML } from './xml.interface';
import { ExternalDocument } from './external-document.interface';
import { Reference } from './reference.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schemaObject}
 */
export type Schema = {
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
  allOf?: Array<Schema | Reference>;
  oneOf?: Array<Schema | Reference>;
  anyOf?: Array<Schema | Reference>;
  not?: Schema | Reference;
  items?: Schema | Reference | Array<Schema | Reference>;
  properties?: Record<string, Schema | Reference>;
  additionalProperties?: Schema | Reference | boolean;
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
} & DataTypeFormat;

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
  allOf?: Array<SchemaMetadata | Reference>;
  oneOf?: Array<SchemaMetadata | Reference>;
  anyOf?: Array<SchemaMetadata | Reference>;
  not?: SchemaMetadata | Reference;
  items?: SchemaMetadata | Reference | Array<SchemaMetadata | Reference>;
  properties?: Record<string, SchemaMetadata | Reference>;
  additionalProperties?: SchemaMetadata | Reference | boolean;
};
