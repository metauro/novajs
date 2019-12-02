import { Header } from './header.interface';
import { Reference } from './index';

export type Encoding = {
  contentType?: string;
  headers?: Record<string, Header | Reference>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
};
