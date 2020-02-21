/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#discriminatorObject}
 */
export type Discriminator = {
  propertyName: string;
  mapping?: Record<string, string>;
};
