/**
 * just a definition use for inject
 */
import { FastifyRequest, Logger } from 'fastify';
import { IncomingMessage } from 'http';
import { Http2ServerRequest } from 'http2';

export class HttpRequest implements FastifyRequest {
  body: Record<string, any>;
  headers: Record<string, any>;
  hostname: string;
  id: any;
  ip: string;
  ips: string[];
  log: Logger;
  params: Record<string, any>;
  query: Record<string, any>;
  raw: IncomingMessage;
  req: IncomingMessage;
}

export class Http2Request implements FastifyRequest<Http2ServerRequest> {
  body: Record<string, any>;
  headers: Record<string, any>;
  hostname: string;
  id: any;
  ip: string;
  ips: string[];
  log: Logger;
  params: Record<string, any>;
  query: Record<string, any>;
  raw: Http2ServerRequest;
  req: Http2ServerRequest;
}
