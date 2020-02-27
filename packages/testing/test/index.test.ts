import {
  Controller,
  HttpRequest,
  HttpResponse,
  Http2Request,
  Http2Response,
} from '@sojs/core';
import { ApiGet } from '@sojs/openapi';
import { ApiRequestQuery } from '@sojs/openapi';

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
