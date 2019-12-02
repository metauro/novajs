### OpenApi Specification

this package define the api schema and export common decorators

### Define Api

```typescript
// optional tag, default is class name
@ApiTag('User')
@Controller('users')
class UserController {
  @Post({ description: 'create a new user' })
  @ApiOkResponse({ type: Number, description: 'return created user id' })
  async createUser(
    @ApiRequestBody({ description: 'user schema' }) userSchema: UserSchema,
  ): Promise<number> {
    return 1;
  }

  @Get()
  @ApiOkResponse({ type: UserSchema })
  async getUser(@ApiRequestQuery() id: number) {
    return new UserSchema();
  }
}

@ApiSchema({ description: 'user' })
class UserSchema {
  @ApiSchema({
    description: 'user id',
    required: false,
  })
  id?: number;

  @ApiSchema()
  username: string;

  @ApiSchema()
  password: string;
}
```
