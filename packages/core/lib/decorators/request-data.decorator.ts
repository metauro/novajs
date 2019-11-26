import { RequestDataMetadata, RequestDataPlace } from '../interfaces';
import { CORE_METADATA } from '../constants';
import { ReflectTool } from '@fastify-plus/common';

function createRequestData(place: RequestDataPlace) {
  return function() {
    return ReflectTool.createParamDecorator<RequestDataMetadata>(
      CORE_METADATA.REQUEST_DATA,
      {
        place,
      },
    );
  };
}

export const RequestHeaders = createRequestData('headers');

export const RequestParams = createRequestData('params');

export const RequestQuery = createRequestData('query');

export const RequestBody = createRequestData('body');
