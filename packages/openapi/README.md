### @sojs/openapi

OpenAPI v3.0 Specification Implementation

See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md

### Usage
####  Define Api

```typescript
import {
  ApiTag,
  ApiPost,
  ApiGet,
  ApiOkResponse,
  ApiRequestBody,
  ApiRequestQuery,
} from '@sojs/openapi';
import { UserSchema } from '../schema/user.schame';

// optional tag, default is class name
@ApiTag('User')
export class UserController {
  @ApiPost({ description: 'create a new user' })
  @ApiOkResponse({ type: Number, description: 'return created user id' })
  async createUser(
    @ApiRequestBody({ description: 'user schema' }) userSchema: UserSchema,
  ): Promise<number> {
    return 1;
  }

  @ApiGet()
  @ApiOkResponse({ type: UserSchema })
  async getUser(@ApiRequestQuery() id: number) {
    return new UserSchema();
  }
}
```

#### Define Schema

```typescript
import { ApiSchema } from '@sojs/openapi';

@ApiSchema({ description: 'user' })
export class UserSchema {
  @ApiSchema({
    description: 'user id, required if update',
    required: false,
  })
  id?: number;

  @ApiSchema()
  username: string;

  @ApiSchema()
  password: string;
}
```
