import { ParsedPath } from 'path';

export type Resource = {
  /**
   * file absolute path
   */
  path: string;
  /**
   * file content, read as utf8
   */
  content: string;
  /**
   * declaration file content
   */
  declarationContent: string;
} & ParsedPath;
