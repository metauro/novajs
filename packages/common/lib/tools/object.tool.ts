export class ObjectTool {
  static walk(obj: Object, fn: (key: string, value: any, obj: Object) => void) {
    Object.keys(obj).forEach(k => {
      const val = obj[k];
      fn(k, val, obj);
      if (Object.prototype.toString.call(val) === '[object Object]') {
        this.walk(val, fn);
      }
    });
  }
}
