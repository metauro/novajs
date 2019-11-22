import { RequestDataMetadata, RequestDataPlace } from '../interfaces';
import { REQUEST_DATA_METADATA_KEY } from '../constants';
import { ReflectTool } from '../tools';

function createRequestData(place: RequestDataPlace) {
  return function() {
    return function(
      target: object,
      propertyKey: string | symbol,
      paramIndex: number,
    ) {
      const metadata =
        ReflectTool.getMetadata<RequestDataMetadata[]>(
          REQUEST_DATA_METADATA_KEY,
          target,
          propertyKey,
        ) || [];
      ReflectTool.defineMetadata<RequestDataMetadata[]>(
        REQUEST_DATA_METADATA_KEY,
        [
          ...metadata,
          {
            place,
            paramIndex,
          },
        ],
        target,
        propertyKey,
      );
    };
  };
}

export const RequestHeaders = createRequestData('headers');

export const RequestParams = createRequestData('params');

export const RequestQuery = createRequestData('query');

export const RequestBody = createRequestData('body');
