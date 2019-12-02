/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#serverVariableObject}
 */
export type ServerVariable = {
  enum?: string[];
  default: string;
  description?: string;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#serverObject}
 */
export type Server = {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariable>;
};
