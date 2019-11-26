import { COMMON_METADATA } from '../constants';

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

  static createClassDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): ClassDecorator {
    return target => {
      Reflect.defineMetadata(metadataKey, metadata, target);
      return target;
    };
  }

  static createPropertyDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): PropertyDecorator {
    return (target, propertyKey) => {
      const properties =
        Reflect.getMetadata(COMMON_METADATA.PROPERTIES, target) || [];
      properties.push(propertyKey);
      Reflect.defineMetadata(
        COMMON_METADATA.PROPERTIES,
        [...new Set(properties)],
        target,
      );
      Reflect.defineMetadata(metadataKey, metadata, target, propertyKey);
    };
  }

  static createMethodDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): MethodDecorator {
    return (target, propertyKey, descriptor) => {
      Reflect.defineMetadata(metadataKey, metadata, descriptor.value);
      return descriptor;
    };
  }

  static createParamDecorator<T = any>(
    metadataKey: any,
    metadata: T,
  ): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
      const m = Reflect.getMetadata(metadataKey, target, propertyKey) || [];
      m[parameterIndex] = metadata;
      Reflect.defineMetadata(metadataKey, m, target, propertyKey);
    };
  }

  static createMixedDecorator<T = any>(metadataKey: any, metadata: T) {
    return (
      target: any,
      key?: string | symbol,
      descriptor?: PropertyDescriptor,
    ) => {
      if (descriptor) {
        return this.createMethodDecorator(metadataKey, metadata)(
          target,
          key,
          descriptor,
        );
      }

      return this.createClassDecorator(metadataKey, metadata)(target);
    };
  }
}
