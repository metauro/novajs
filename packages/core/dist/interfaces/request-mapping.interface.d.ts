export declare type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'
  | 'DELETE';
export declare type RequestMappingOptions = {
  path?: string;
  method?: RequestMethod;
};
export declare type RequestMappingMetadata = Required<RequestMappingOptions>;
