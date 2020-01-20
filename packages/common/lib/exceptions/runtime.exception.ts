/**
 * Exception do not interrupt the program
 * it will be catch by framework
 */
export class RuntimeException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
