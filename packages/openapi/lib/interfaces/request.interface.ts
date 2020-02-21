import { MediaType } from './media.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#requestBodyObject}
 */
export type RequestBody = {
  description?: string;
  content: Record<string, MediaType>;
  required?: boolean;
};
