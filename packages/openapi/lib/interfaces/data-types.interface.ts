export type DataType =
  | 'object'
  | 'array'
  | 'integer'
  | 'number'
  | 'string'
  | 'boolean';

export type DataFormat<T extends DataType> = T extends 'integer'
  ? 'int32' | 'int64'
  : T extends 'number'
  ? 'float' | 'double'
  : T extends 'string'
  ? '' | 'byte' | 'binary' | 'date' | 'date-time' | 'password'
  : '';

export type DataTypeFormat =
  | {
      type?: 'integer';
      format?: 'int32' | 'int64';
    }
  | {
      type?: 'number';
      format?: 'float' | 'double';
    }
  | {
      type?: 'string';
      format?: '' | 'byte' | 'binary' | 'date' | 'date-time' | 'password';
    }
  | {
      type?: 'boolean' | 'object' | 'array';
      format?: '';
    };
