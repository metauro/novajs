export declare type RequestDataPlace = 'headers' | 'params' | 'query' | 'body';
export declare type RequestDataMetadata = {
  place: RequestDataPlace;
  field?: string;
};
