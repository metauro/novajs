import {
  Controller,
  HttpRequest,
  HttpResponse,
  Http2Request,
  Http2Response,
} from '@fastify-plus/core';
import { ApiGet } from '@fastify-plus/openapi';
import { ApiRequestQuery } from '@fastify-plus/openapi';

@Controller('test')
class TestController {
  @ApiGet()
  test(req: HttpRequest, res: HttpResponse, @ApiRequestQuery() query: string) {
    return '';
  }
}

const a: ExcludeFromTuple<
  Parameters<TestController['test']>,
  HttpRequest | HttpResponse | Http2Request | Http2Response
> = [];
