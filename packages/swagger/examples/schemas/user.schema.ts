import { ApiSchema } from '@fastify-plus/openapi';

export class UserSchema {
  @ApiSchema({ description: '用户名' })
  username: string;

  @ApiSchema({ description: '密码' })
  password: string;

  @ApiSchema({ description: '昵称' })
  nickname: string;

  @ApiSchema({ description: '头像地址' })
  avatar: string;
}
