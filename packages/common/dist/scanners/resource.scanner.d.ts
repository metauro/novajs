import { Resource } from '../interfaces';
export declare class ResourceScanner {
  private static cache;
  static scan(dir: string): Promise<Resource[]>;
  /**
   * scan resources filter by infix
   * @param infix - file infix
   * @param dir - search dir
   */
  static scanByInfix(dir: string, infix: string): Promise<Resource[]>;
  /**
   * scan resources filter by suffix
   * @param suffix - file suffix
   * @param dir - search dir
   */
  static scanBySuffix(dir: string, suffix: string): Promise<Resource[]>;
}
