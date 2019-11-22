export type RequestDataPlace = 'headers' | 'params' | 'query' | 'body';

export type RequestDataMetadata = {
  place: RequestDataPlace;
  paramIndex: number;
  field?: string;
};
