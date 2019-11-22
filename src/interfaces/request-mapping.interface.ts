export type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'
  | 'DELETE';

export type RequestMappingOptions = {
  path?: string;
  method?: RequestMethod;
};

export type RequestMappingMetadata = Required<RequestMappingOptions>;
