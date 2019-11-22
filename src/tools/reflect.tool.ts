export class ReflectTool {
  static getMetadata<T = any>(
    metadataKey: any,
    target: object,
    propertyKey?: string | symbol,
  ): T {
    return Reflect.getMetadata(metadataKey, target, propertyKey);
  }

  static defineMetadata<T = any>(
    metadataKey: any,
    metadataValue: T,
    target: object,
    propertyKey?: string | symbol,
  ): void {
    return Reflect.defineMetadata(
      metadataKey,
      metadataValue,
      target,
      propertyKey,
    );
  }
}
