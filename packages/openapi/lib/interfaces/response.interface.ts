import { Header } from './header.interface';
import { MediaType } from './media.interface';
import { Link } from './link.interface';
import { Reference } from './reference.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#responseObject}
 */
export type Response = {
  description: string;
  headers?: Record<string, Header | Reference>;
  content?: Record<string, MediaType>;
  links?: Record<string, Link | Reference>;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#responsesObject}
 */
export type Responses = {
  default?: Response | Reference;
  [key: string]: Response | Reference;
};
