import isClass from 'is-class';
import { omit } from 'lodash';
import { Schema } from '../interfaces';
import { COMMON_METADATA, ReflectTool } from '@novajs/common';
import { OpenApiExplorer } from '../openapi.explorer';

export class TypeTool {
  private static typeMap = new Map<Function, Schema>([
    [String, { type: 'string' }],
    [Number, { type: 'number' }],
    [Boolean, { type: 'boolean' }],
    [Date, { type: 'string', format: 'date-time' }],
  ]);

  static getSchema(type: Function, isArray = false): Schema {
    let schema: Schema;

    if (isClass(type)) {
      schema = { type: 'object', required: [], properties: {} };
      for (const k of ReflectTool.getOwnDecoratedProperties(type.prototype)) {
        const addition = OpenApiExplorer.exploreSchema(type.prototype, k);
        if (addition.required) {
          schema.required.push(k);
        }
        schema.properties[k] = {
          ...this.getSchema(
            Reflect.getMetadata(COMMON_METADATA.TYPE, type.prototype, k),
          ),
          ...omit(addition, 'required'),
        } as any;
      }
    } else {
      schema = this.typeMap.get(type);
    }

    if (isArray) {
      return {
        type: 'array',
        items: schema,
      };
    }

    return schema;
  }
}
