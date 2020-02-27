import { ReflectTool } from '@novajs/common';
import { merge } from 'lodash';
import { Operation, OperationMetadata, OperationMethod } from '../interfaces';
import { OPENAPI_METADATA } from '../constants';

function createOperation(method: OperationMethod) {
  return (metadata?: string | Partial<{ path: string } & Operation>) => {
    if (typeof metadata === 'string') {
      metadata = {
        path: metadata,
      };
    }

    return ReflectTool.createMethodDecorator<OperationMetadata>(
      OPENAPI_METADATA.API_OPERATION,
      merge(
        {
          path: '',
          method: 'get',
          responses: {},
        },
        metadata,
        {
          method,
        },
      ),
    );
  };
}

export const ApiGet = createOperation('get');

export const ApiPut = createOperation('put');

export const ApiPost = createOperation('post');

export const ApiDelete = createOperation('delete');

export const ApiOptions = createOperation('options');

export const ApiHead = createOperation('head');

export const ApiPatch = createOperation('patch');

export const ApiTrace = createOperation('trace');
