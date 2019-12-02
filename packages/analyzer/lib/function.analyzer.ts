export class FunctionAnalyzer {
  static getParamNames(fn: Function): string[] {
    const match = fn.toString().match(/\(([A-Za-z0-9_, ]*)\)/);

    if (!match) {
      return [];
    }

    return match[1].split(',').map(n => n.trim());
  }
}
