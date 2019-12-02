import { PathItem } from './path.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.mdhttps://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#callbackObject#callbackObject}
 */
export type Callback = Record<string, PathItem>;
