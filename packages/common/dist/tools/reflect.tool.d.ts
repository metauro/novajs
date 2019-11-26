export declare class ReflectTool {
  static getMetadata<T = any>(
    metadataKey: any,
    target: object,
    propertyKey?: string | symbol,
  ): T;
  static defineMetadata<T = any>(
    metadataKey: any,
    metadataValue: T,
    target: object,
    propertyKey?: string | symbol,
  ): void;
  static createClassDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): ClassDecorator;
  static createPropertyDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): PropertyDecorator;
  static createMethodDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): MethodDecorator;
  static createParamDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): ParameterDecorator;
  static createMixedDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): (
    target: any,
    key?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => any;
}
