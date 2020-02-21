import { PathItem } from './path.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.mdhttps://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#callbackObject#callbackObject}
 */
export type Callback = Record<string, PathItem>;
