export declare class KlassTool {
  /**
   * @param target
   * @returns prototype chain, exclude Object.prototype and Function
   */
  static getPrototypes(target: object): any[];
  static getOwnerFunctionKeys(target: object): string[];
  static getFunctionKeys(target: object): string[];
}
