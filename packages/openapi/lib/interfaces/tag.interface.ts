import { ExternalDocument } from './external-document.interface';

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#tagObject}
 */
export type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocument;
};
