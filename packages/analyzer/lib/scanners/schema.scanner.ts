// import { CodeAnalysisTool, RuntimeTool } from '../tools';
// import { ResourceScanner } from './resource.scanner';
//
// type Schema = {
//   $id: string;
//   type:
//     | 'string'
//     | 'array'
//     | 'integer'
//     | 'number'
//     | 'boolean'
//     | 'object'
//     | string;
//   $ref?: string;
//   items?: Record<string, Omit<Schema, '$id'>>;
//   properties?: Record<string, Omit<Schema, '$id'>>;
// };
//
// const supportTypes = [
//   'string',
//   'array',
//   'integer',
//   'number',
//   'boolean',
//   'object',
// ];
//
// export class SchemaScanner {
//   static async scan(dir: string) {
//     const fileType = RuntimeTool.inTsRuntime() ? 'dto' : 'dto.d';
//     const resources = (await ResourceScanner.scan(dir)).filter(r =>
//       r.name.endsWith(fileType),
//     );
//     const schemas: any[] = [];
//
//     for (const resource of resources) {
//       for (const content of CodeAnalysisTool.matchClasses(resource.content)) {
//         const name = CodeAnalysisTool.matchFirstClassName(content);
//         const properties = CodeAnalysisTool.matchProperties(content);
//         const schema: any = {
//           $id: '#' + name,
//           type: 'object',
//           properties: {},
//           required: [],
//         };
//
//         for (let {
//           name,
//           type,
//           arrayType,
//           tupleTypes,
//           isRequired,
//         } of properties) {
//           if (isRequired) {
//             schema.required.push(name);
//           }
//
//           type = type === 'Date' || type === 'RegExp' ? 'string' : type;
//
//           arrayType =
//             arrayType === 'Date' || arrayType === 'RegExp'
//               ? 'string'
//               : arrayType;
//
//           tupleTypes =
//             tupleTypes &&
//             tupleTypes.map(s =>
//               s === 'Date' || s === 'RegExp' ? 'string' : s,
//             );
//
//           if (arrayType) {
//             const items = supportTypes.includes(arrayType)
//               ? {
//                   type: arrayType,
//                 }
//               : {
//                   $ref: '#' + arrayType,
//                 };
//             schema.properties[name] = { type: 'array', items };
//           } else if (tupleTypes) {
//             schema.properties[name] = {
//               type: 'array',
//               items: tupleTypes.map(t =>
//                 supportTypes.includes(t)
//                   ? {
//                       type: t,
//                     }
//                   : {
//                       $ref: '#' + t,
//                     },
//               ),
//             };
//           } else {
//             schema.properties[name] = supportTypes.includes(type)
//               ? {
//                   type,
//                 }
//               : {
//                   $ref: '#' + type,
//                 };
//           }
//         }
//         schemas.push(schema);
//       }
//     }
//
//     return this.adjustSchemaInitChain(schemas);
//   }
//
//   /**
//    * adjust the schema order, insure the depend scheme has been init before init the schema
//    * @param schemas
//    */
//   protected static adjustSchemaInitChain(schemas: any[]) {
//     const orderSchemas: any[] = [];
//     for (const s of schemas) {
//       // if order schemas not exists s
//       if (!orderSchemas.some(schema => schema.$id === s.$id)) {
//         orderSchemas.push(s);
//       }
//
//       for (const p of Object.values(s.properties) as any[]) {
//         const ref: string = p.$ref || (p.items && p.items.$ref);
//
//         if (!ref) {
//           continue;
//         }
//
//         const refSchema = schemas.find(s => s.$id === ref);
//         const refSchemaIndex = orderSchemas.findIndex(
//           s => s.$id === refSchema.$id,
//         );
//
//         if (refSchemaIndex > -1) {
//           orderSchemas.splice(refSchemaIndex, 1);
//         }
//
//         orderSchemas.unshift(refSchema);
//       }
//     }
//     return orderSchemas;
//   }
// }
