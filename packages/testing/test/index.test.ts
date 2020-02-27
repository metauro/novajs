import {
  Controller,
  HttpRequest,
  HttpResponse,
  Http2Request,
  Http2Response,
} from '@novajs/core';
import { ApiGet } from '@novajs/openapi';
import { ApiRequestQuery } from '@novajs/openapi';

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
