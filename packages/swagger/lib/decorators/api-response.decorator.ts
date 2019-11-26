import { merge, omit } from 'lodash';
import { SWAGGER_METADATA } from '../constants';
import { Class } from 'utility-types';
import { HttpStatus } from '@fastify-plus/common';

export type ResponseMetadata = {
  description?: string;
  type?:
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | DateConstructor
    | Class<any>;
  isArray?: boolean;
  headers?: any;
};

export const ApiResponse = (
  metadata: {
    status: number;
  } & ResponseMetadata,
) => {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const responses =
      Reflect.getMetadata(SWAGGER_METADATA.API_RESPONSE, descriptor.value) ||
      {};
    responses[metadata.status] = merge(
      { description: '' },
      omit(metadata, 'status'),
    );
    Reflect.defineMetadata(
      SWAGGER_METADATA.API_RESPONSE,
      responses,
      descriptor.value,
    );
    return descriptor;
  };
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
