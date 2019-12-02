import { COMMON_METADATA } from '../constants';

export class ReflectTool {
  static getOwnMetadata<T = any>(
    metadataKey: any,
    target: Object,
    key?: string | symbol,
  ): T | undefined {
    return Reflect.getOwnMetadata(metadataKey, target, key);
  }

  static getMetadata<T = any>(
    metadataKey: any,
    target: Object,
    key?: string | symbol,
  ): T | undefined {
    return Reflect.getMetadata(metadataKey, target, key);
  }

  static defineMetadata<T = any>(
    metadataKey: any,
    metadataValue: T,
    target: Object,
    key?: string | symbol,
  ): void {
    return Reflect.defineMetadata(metadataKey, metadataValue, target, key);
  }

  private static transformMetadata(metadata: any, ...args: any[]) {
    if (typeof metadata === 'function') {
      return metadata(...args);
    }

    return metadata;
  }

  static createClassDecorator<T = any>(
    metadataKey: any,
    metadata: T | ((target: Function) => T),
  ): ClassDecorator {
    return target => {
      this.defineMetadata(
        metadataKey,
        this.transformMetadata(metadata, target),
        target,
      );
      return target;
    };
  }

  static createPropertyDecorator<T = any>(
    metadataKey: any,
    metadata: T | ((target: Object, key: string | symbol) => T),
  ): PropertyDecorator {
    return (target, key) => {
      this.recordProperty(target, key);
      this.defineMetadata(
        metadataKey,
        this.transformMetadata(metadata, target, key),
        target,
        key,
      );
    };
  }

  static createMethodDecorator<T = any>(
    metadataKey: any,
    metadata:
      | T
      | ((
          target: Object,
          key: string | symbol,
          descriptor: PropertyDescriptor,
        ) => T),
  ): MethodDecorator {
    return (target, key, descriptor) => {
      this.recordProperty(target, key);
      this.defineMetadata(
        metadataKey,
        this.transformMetadata(metadata, target, key, descriptor),
        descriptor.value,
      );
      return descriptor;
    };
  }

  static createParamDecorator<T = any>(
    metadataKey: any,
    metadata:
      | T
      | ((target: Object, key: string | symbol, paramIndex: number) => T),
  ): ParameterDecorator {
    return (target, key, paramIndex) => {
      this.recordProperty(target, key);
      const m = this.getOwnMetadata(metadataKey, target, key) || [];
      m[paramIndex] = this.transformMetadata(metadata, target, key, paramIndex);
      this.defineMetadata(metadataKey, m, target, key);
    };
  }

  static createMixedDecorator<T = any>(
    metadataKey: any,
    metadata:
      | T
      | ((
          target: Object,
          key?: string | symbol,
          descriptor?: PropertyDescriptor,
        ) => T),
  ) {
    return (
      target: any,
      key?: string | symbol,
      descriptor?: PropertyDescriptor,
    ) => {
      metadata = this.transformMetadata(metadata, target, key, descriptor);
      if (descriptor) {
        this.recordProperty(target, key);
        return this.createMethodDecorator(metadataKey, metadata)(
          target,
          key,
          descriptor,
        );
      }

      return this.createClassDecorator(metadataKey, metadata)(target);
    };
  }

  static getOwnDecoratedKeys(target: Object): string[] {
    return this.getOwnMetadata(COMMON_METADATA.PROPERTIES, target) || [];
  }

  static getOwnDecoratedFunctionKeys(target: Object) {
    return this.getOwnDecoratedKeys(target).filter(
      k => typeof target[k] === 'function',
    );
  }

  static getOwnDecoratedProperties(target: Object) {
    return this.getOwnDecoratedKeys(target).filter(
      k => typeof target[k] !== 'function',
    );
  }

  private static recordProperty(target: Object, key: string | symbol) {
    const properties =
      this.getOwnMetadata(COMMON_METADATA.PROPERTIES, target) || [];
    properties.push(key);
    this.defineMetadata(
      COMMON_METADATA.PROPERTIES,
      [...new Set(properties)],
      target,
    );
  }
}
