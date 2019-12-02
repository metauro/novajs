import isClass from 'is-class';
import { DataTypeFormat } from '../interfaces/data-types.interface';
import { Reference, Schema } from '../interfaces';

export class TypeTool {
  private static typeMap = new Map<Function, DataTypeFormat>([
    [String, { type: 'string' }],
    [Number, { type: 'number' }],
    [Boolean, { type: 'boolean' }],
    [Date, { type: 'string', format: 'date-time' }],
  ]);

  static getSchema(type: Function, isArray = false): Schema | Reference {
    const schema = isClass(type)
      ? {
          $ref: `#/components/schemas/${type.name}`,
        }
      : this.typeMap.get(type);

    if (isArray) {
      return {
        type: 'array',
        items: schema,
      };
    }

    return schema;
  }
}
