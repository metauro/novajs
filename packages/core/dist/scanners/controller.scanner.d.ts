import { Controller } from '../interfaces';
export declare class ControllerScanner {
  static scan(dir: string): Promise<Controller[]>;
}
