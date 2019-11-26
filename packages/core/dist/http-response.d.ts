/// <reference types="node" />
/**
 * just a definition use for inject
 */
import * as fastify from 'fastify';
import { ServerResponse } from 'http';
import { Http2ServerResponse } from 'http2';
export declare class HttpResponse
  implements fastify.FastifyReply<ServerResponse> {
  context: fastify.FastifyContext;
  request: fastify.FastifyRequest;
  res: ServerResponse;
  sent: boolean;
  callNotFound(): void;
  code(statusCode: number): fastify.FastifyReply<ServerResponse>;
  getHeader(name: string): string | undefined;
  getResponseTime(): number;
  hasHeader(name: string): boolean;
  header(name: string, value: any): fastify.FastifyReply<ServerResponse>;
  headers(headers: { [p: string]: any }): fastify.FastifyReply<ServerResponse>;
  redirect(url: string): fastify.FastifyReply<ServerResponse>;
  redirect(
    statusCode: number,
    url: string,
  ): fastify.FastifyReply<ServerResponse>;
  removeHeader(name: string): fastify.FastifyReply<ServerResponse>;
  send(payload?: any): fastify.FastifyReply<ServerResponse>;
  serialize(payload: any): string;
  serializer(fn: Function): fastify.FastifyReply<ServerResponse>;
  status(statusCode: number): fastify.FastifyReply<ServerResponse>;
  type(contentType: string): fastify.FastifyReply<ServerResponse>;
}
export declare class Http2Response
  implements fastify.FastifyReply<Http2ServerResponse> {
  context: fastify.FastifyContext;
  request: fastify.FastifyRequest;
  res: Http2ServerResponse;
  sent: boolean;
  callNotFound(): void;
  code(statusCode: number): fastify.FastifyReply<Http2ServerResponse>;
  getHeader(name: string): string | undefined;
  getResponseTime(): number;
  hasHeader(name: string): boolean;
  header(name: string, value: any): fastify.FastifyReply<Http2ServerResponse>;
  headers(headers: {
    [p: string]: any;
  }): fastify.FastifyReply<Http2ServerResponse>;
  redirect(url: string): fastify.FastifyReply<Http2ServerResponse>;
  redirect(
    statusCode: number,
    url: string,
  ): fastify.FastifyReply<Http2ServerResponse>;
  removeHeader(name: string): fastify.FastifyReply<Http2ServerResponse>;
  send(payload?: any): fastify.FastifyReply<Http2ServerResponse>;
  serialize(payload: any): string;
  serializer(fn: Function): fastify.FastifyReply<Http2ServerResponse>;
  status(statusCode: number): fastify.FastifyReply<Http2ServerResponse>;
  type(contentType: string): fastify.FastifyReply<Http2ServerResponse>;
}
