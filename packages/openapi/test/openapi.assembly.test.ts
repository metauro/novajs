import {
  ApiGet,
  ApiPost,
  ApiPut,
  ApiRequestBody,
  ApiRequestParam,
  ApiSchema,
  OpenApiAssembly,
  Schema,
} from '../lib';
import { ApiPath } from '../lib/decorators/api-path.decorator';

class Test {
  @ApiSchema()
  str: string;

  @ApiSchema()
  num: number;

  @ApiSchema()
  bool: Boolean;

  @ApiSchema()
  date: Date;
}

describe('openapi assembly', () => {
  it('should assemble correct schema', () => {
    expect(OpenApiAssembly.assembleSchema(Test)).toMatchObject<Schema>({
      title: 'Test',
      properties: {
        str: {
          type: 'string',
        },
        num: {
          type: 'number',
        },
        bool: {
          type: 'boolean',
        },
        date: {
          type: 'string',
          format: 'date-time',
        },
      },
    });
  });

  it('should assemble correct operation', () => {
    class UserSchema {
      @ApiSchema()
      id?: number;

      @ApiSchema()
      username: string;

      @ApiSchema()
      password: string;
    }

    @ApiPath('tests')
    class TestController {
      @ApiPost()
      createUser(
        @ApiRequestBody({ description: 'will created user' })
        userSchema: UserSchema,
      ) {}

      @ApiGet(':id')
      getUser(@ApiRequestParam('id') id: number) {}

      @ApiPut(':id')
      updateUser(
        @ApiRequestParam() id: number,
        @ApiRequestBody({ description: 'update user schema' })
        userSchema: UserSchema,
      ) {}
    }

    console.log(OpenApiAssembly.assemblePathItem(TestController, 'createUser'));
  });
});
