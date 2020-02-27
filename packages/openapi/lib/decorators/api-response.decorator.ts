import { OPENAPI_METADATA } from '../constants';
import { COMMON_METADATA, HttpStatus, ReflectTool } from '@sojs/common';
import { pick } from 'lodash';
import { Encoding, Header, Responses } from '../interfaces';
import isClass from 'is-class';
import { TypeTool } from '../tools';

export type ResponseMetadata = {
  type?: any;
  description?: string;
  contentType?: string;
  isArray?: boolean;
  headers?: Record<string, Header>;
} & Omit<Encoding, 'schema'>;

export const ApiResponse = (
  metadata: {
    status: number;
  } & ResponseMetadata,
) => {
  return ReflectTool.createMethodDecorator<Responses>(
    OPENAPI_METADATA.API_RESPONSES,
    (target, key, descriptor) => {
      const responses =
        ReflectTool.getOwnMetadata<Responses>(
          OPENAPI_METADATA.API_RESPONSES,
          descriptor.value,
        ) || {};

      const type =
        metadata.type ||
        ReflectTool.getOwnMetadata<Function>(
          COMMON_METADATA.RETURN_TYPE,
          target,
          key,
        );
      const contentType = isClass(type) ? 'application/json' : 'text/plain';

      responses[metadata.status] = {
        description: metadata.description || '',
        headers: metadata.headers,
        content: {
          [contentType]: {
            ...(contentType === 'text/plain'
              ? {}
              : { schema: TypeTool.getSchema(type, metadata.isArray) }),
            ...pick(metadata, 'example', 'examples', 'encoding'),
          } as any,
        },
      };
      return responses;
    },
  );
};

export const ApiOkResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.OK,
  });

export const ApiCreatedResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.CREATED,
  });

export const ApiAcceptedResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.ACCEPTED,
  });

export const ApiNoContentResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.NO_CONTENT,
  });

export const ApiMovedPermanentlyResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.MOVED_PERMANENTLY,
  });

export const ApiBadRequestResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.BAD_REQUEST,
  });

export const ApiUnauthorizedResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.UNAUTHORIZED,
  });

export const ApiTooManyRequestsResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.TOO_MANY_REQUESTS,
  });

export const ApiNotFoundResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.NOT_FOUND,
  });

export const ApiInternalServerErrorResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  });

export const ApiBadGatewayResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.BAD_GATEWAY,
  });

export const ApiConflictResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.CONFLICT,
  });

export const ApiForbiddenResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.FORBIDDEN,
  });

export const ApiGatewayTimeoutResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.GATEWAY_TIMEOUT,
  });

export const ApiGoneResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.GONE,
  });

export const ApiMethodNotAllowedResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.METHOD_NOT_ALLOWED,
  });

export const ApiNotAcceptableResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.NOT_ACCEPTABLE,
  });

export const ApiNotImplementedResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.NOT_IMPLEMENTED,
  });

export const ApiPayloadTooLargeResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.PAYLOAD_TOO_LARGE,
  });

export const ApiRequestTimeoutResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.REQUEST_TIMEOUT,
  });

export const ApiServiceUnavailableResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.SERVICE_UNAVAILABLE,
  });

export const ApiUnprocessableEntityResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  });

export const ApiUnsupportedMediaTypeResponse = (metadata: ResponseMetadata) =>
  ApiResponse({
    ...metadata,
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  });
