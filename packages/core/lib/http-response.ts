/**
 * just a definition use for inject
 */
import * as fastify from 'fastify';
import { ServerResponse } from 'http';
import { Http2ServerResponse } from 'http2';

export class HttpResponse implements fastify.FastifyReply<ServerResponse> {
  context: fastify.FastifyContext;
  request: fastify.FastifyRequest;
  res: ServerResponse;
  sent: boolean;

  callNotFound(): void {
    return void 0;
  }

  code(statusCode: number): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  getHeader(name: string): string | undefined {
    return undefined;
  }

  getResponseTime(): number {
    return 0;
  }

  hasHeader(name: string): boolean {
    return false;
  }

  header(name: string, value: any): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  headers(headers: { [p: string]: any }): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  redirect(url: string): fastify.FastifyReply<ServerResponse>;
  redirect(
    statusCode: number,
    url: string,
  ): fastify.FastifyReply<ServerResponse>;
  redirect(
    statusCodeOrUrl: string | number,
    url?: string,
  ): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  removeHeader(name: string): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  send(payload?: any): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  serialize(payload: any): string {
    return '';
  }

  serializer(fn: Function): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  status(statusCode: number): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }

  type(contentType: string): fastify.FastifyReply<ServerResponse> {
    return undefined;
  }
}

export class Http2Response
  implements fastify.FastifyReply<Http2ServerResponse> {
  context: fastify.FastifyContext;
  request: fastify.FastifyRequest;
  res: Http2ServerResponse;
  sent: boolean;

  callNotFound(): void {
    return;
  }

  code(statusCode: number): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  getHeader(name: string): string | undefined {
    return undefined;
  }

  getResponseTime(): number {
    return 0;
  }

  hasHeader(name: string): boolean {
    return false;
  }

  header(name: string, value: any): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  headers(headers: {
    [p: string]: any;
  }): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  redirect(url: string): fastify.FastifyReply<Http2ServerResponse>;
  redirect(
    statusCode: number,
    url: string,
  ): fastify.FastifyReply<Http2ServerResponse>;
  redirect(
    statusCodeOrUrl: string | number,
    url?: string,
  ): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  removeHeader(name: string): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  send(payload?: any): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  serialize(payload: any): string {
    return '';
  }

  serializer(fn: Function): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  status(statusCode: number): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }

  type(contentType: string): fastify.FastifyReply<Http2ServerResponse> {
    return undefined;
  }
}
