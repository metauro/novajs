import { isFunction } from 'lodash';

export class KlassTool {
  /**
   * @param target
   * @returns prototype chain, exclude Object.prototype and Function
   */
  static getPrototypes(target: object): any[] {
    const prototypes: any[] = [];
    let proto = Object.getPrototypeOf(target);

    while (proto && proto !== Object.prototype && proto !== Function) {
      prototypes.push(proto);
      proto = Object.getPrototypeOf(proto);
    }

    return prototypes;
  }

  static getOwnerFunctionKeys(target: object): string[] {
    return Object.getOwnPropertyNames(target).filter(k =>
      isFunction(target[k]),
    );
  }

  static getFunctionKeys(target: object): string[] {
    const result: string[] = [];

    [target, ...this.getPrototypes(target)].forEach(p =>
      result.push(...this.getOwnerFunctionKeys(p)),
    );

    return result;
  }
}
