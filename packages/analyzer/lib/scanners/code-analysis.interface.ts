export type CodeProperty = {
  name: string;
  type: string;
  arrayType?: string;
  tupleTypes?: string[];
  isRequired: boolean;
};

export type Properties = Record<
  string,
  {
    required?: boolean;
    type: string;
  }
>;

export type CodeType = {
  /**
   * origin type
   */
  type: string;
  /**
   * if type is Array<string>, then wrapType is Array
   */
  wrapType?: string;
  /**
   * if type is Array<string>, then genericType is string
   */
  genericType?: string;
  /**
   * types of tuple element
   */
  tupleTypes?: string[];
};
