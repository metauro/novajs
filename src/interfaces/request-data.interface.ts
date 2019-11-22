export type RequestDataPlace = 'headers' | 'params' | 'querystring' | 'body';

export type RequestDataMetadata = {
  place: RequestDataPlace;
  paramIndex: number;
  field?: string;
};
