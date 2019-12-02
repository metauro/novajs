import {
  ApiDelete,
  ApiGet,
  ApiPath,
  ApiPost,
  ApiPut,
  ApiRequestBody,
  ApiRequestParam,
  ApiRequestQuery,
  ApiTag,
  ApiSecurity,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@fastify-plus/openapi';
import { UserSchema } from '../schemas/user.schema';

@ApiTag('用户管理')
@ApiPath('users')
export class UserController {
  @ApiPost()
  @ApiSecurity()
  createUser(@ApiRequestBody() userSchema: UserSchema) {
    return userSchema;
  }

  @ApiGet()
  @ApiOkResponse({ type: UserSchema, isArray: true, description: 'user list' })
  getUsers(
    @ApiRequestQuery() page: number,
    @ApiRequestQuery() pageSize: number,
  ) {
    return { page, pageSize };
  }

  @ApiGet('{id}')
  @ApiNotFoundResponse({ description: 'user not found' })
  getUser(@ApiRequestParam() id: number) {
    return id;
  }

  @ApiPut('{id}')
  @ApiOkResponse({ type: UserSchema, description: 'update success' })
  updateUser(
    @ApiRequestBody() userSchema: UserSchema,
    @ApiRequestParam({ description: 'user id' }) id: number,
  ) {
    return {
      ...userSchema,
      id,
    };
  }

  @ApiDelete('{id}')
  @ApiSecurity()
  deleteUser(@ApiRequestParam() id: number) {
    return id;
  }
}
