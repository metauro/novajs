import { Schema } from './schema.interface';
import { Example } from './example.interface';
import { Reference } from './index';
import { MediaType } from './media.interface';

export type QueryParameterStyle =
  | 'form'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject';

export type HeaderParameterStyle = 'simple';

export type PathParameterStyle = 'matrix' | 'label' | 'simple';

export type CookieParameterStyle = 'form';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#parameterObject}
 */
export type Parameter = {
  name: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: Schema | Reference;
  example?: any;
  examples?: Record<string, Example | Reference>;
  content?: Record<string, MediaType>;
} & (
  | {
      in: 'query';
      style?: QueryParameterStyle;
    }
  | {
      in: 'header';
      style?: HeaderParameterStyle;
    }
  | {
      in: 'path';
      style?: PathParameterStyle;
      required: true;
    }
  | {
      in: 'cookie';
      style?: CookieParameterStyle;
    });
