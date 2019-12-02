export class ClassTool {
  /**
   * @param target
   * @returns prototype chain, exclude Object.prototype and Function
   */
  static getPrototypes(target: Object): any[] {
    const prototypes: any[] = [];
    let proto = Reflect.getPrototypeOf(target);

    while (
      proto &&
      proto !== Object.prototype &&
      proto !== Reflect.getPrototypeOf(Function)
    ) {
      prototypes.push(proto);
      proto = Reflect.getPrototypeOf(proto);
    }

    return prototypes;
  }

  static getOwnerFunctionKeys(target: Object): string[] {
    return Object.getOwnPropertyNames(target).filter(
      k => typeof target[k] === 'function',
    );
  }

  static getFunctionKeys(target: Object): string[] {
    const result: string[] = [];

    [target, ...this.getPrototypes(target)].forEach(p =>
      result.push(...this.getOwnerFunctionKeys(p)),
    );

    return result;
  }
}
