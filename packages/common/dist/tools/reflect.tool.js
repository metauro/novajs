"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class ReflectTool {
    static getMetadata(metadataKey, target, propertyKey) {
        return Reflect.getMetadata(metadataKey, target, propertyKey);
    }
    static defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    static createClassDecorator(metadataKey, metadata) {
        return target => {
            Reflect.defineMetadata(metadataKey, metadata, target);
            return target;
        };
    }
    static createPropertyDecorator(metadataKey, metadata) {
        return (target, propertyKey) => {
            const properties = Reflect.getMetadata(constants_1.COMMON_METADATA.PROPERTIES, target) || [];
            properties.push(propertyKey);
            Reflect.defineMetadata(constants_1.COMMON_METADATA.PROPERTIES, [...new Set(properties)], target);
            Reflect.defineMetadata(metadataKey, metadata, target, propertyKey);
        };
    }
    static createMethodDecorator(metadataKey, metadata) {
        return (target, propertyKey, descriptor) => {
            Reflect.defineMetadata(metadataKey, metadata, descriptor.value);
            return descriptor;
        };
    }
    static createParamDecorator(metadataKey, metadata) {
        return (target, propertyKey, parameterIndex) => {
            const m = Reflect.getMetadata(metadataKey, target, propertyKey) || [];
            m[parameterIndex] = metadata;
            Reflect.defineMetadata(metadataKey, m, target, propertyKey);
        };
    }
    static createMixedDecorator(metadataKey, metadata) {
        return (target, key, descriptor) => {
            if (descriptor) {
                return this.createMethodDecorator(metadataKey, metadata)(target, key, descriptor);
            }
            return this.createClassDecorator(metadataKey, metadata)(target);
        };
    }
}
exports.ReflectTool = ReflectTool;
//# sourceMappingURL=reflect.tool.js.map