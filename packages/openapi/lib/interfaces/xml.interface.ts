/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#xmlObject}
 */
export type XML = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
};
