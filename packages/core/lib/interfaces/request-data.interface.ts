export type RequestDataPlace = 'headers' | 'params' | 'query' | 'body';

export type RequestDataMetadata = {
  place: RequestDataPlace;
  field?: string;
};
