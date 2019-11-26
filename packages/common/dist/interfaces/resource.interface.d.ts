/// <reference types="node" />
import { ParsedPath } from 'path';
export declare type Resource = {
  path: string;
  /**
   * eg:
   *   test.service.ts infix is service
   *   setup-test.ts infix is empty string
   */
  infix?: string;
  /**
   * alias ext, but exclude dot
   */
  suffix: string;
  /**
   * file content, read as utf8
   */
  content: string;
} & ParsedPath;
