import { FastifyPlusApplication, Controller } from '../lib';
import {
  ApiGet,
  ApiRequestQuery,
  ApiRequestParam,
  ApiRequestHeader,
  ApiRequestCookie,
  ApiRequestBody,
} from '@fastify-plus/openapi';
import { ApiSchema } from '@fastify-plus/openapi';

export class Query {
  @ApiSchema()
  page: number;

  @ApiSchema()
  pageSize: number;
}

@Controller('users')
export class UserController {
  @ApiGet('{id}')
  getUser(@ApiRequestParam() id: number) {
    return id;
  }

  @ApiGet('list')
  getList(@ApiRequestQuery() query: Query) {}

  @ApiGet()
  getUsers(
    @ApiRequestQuery() page: number,
    @ApiRequestQuery() pageSize: number,
  ) {
    return {
      page,
      pageSize,
    };
  }
}

async function bootstrap() {
  const app = await FastifyPlusApplication.create({ appRootPath: __dirname });
  await app.start(3000);
}

bootstrap();
