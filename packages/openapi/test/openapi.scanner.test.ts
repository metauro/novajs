import {
  ApiOkResponse,
  ApiPath,
  ApiPost,
  ApiRequestBody,
  ApiRequestCookie,
  ApiSchema,
  OpenApiScanner,
  Schema,
} from '../lib';
import { Klass, KlassScanner } from '@fastify-plus/common';

export class UserSchema {
  @ApiSchema({ required: false })
  id?: number;

  @ApiSchema({ description: 'username' })
  username: string;

  @ApiSchema({ description: 'test password' })
  password: string;
}

@ApiSchema({ description: 'The Admin' })
export class AdminSchema extends UserSchema {
  @ApiSchema()
  nickname: string;
}

export class NotASchema {
  dontScanMe: string;
}

@ApiPath('users')
export class UserController {
  @ApiPost()
  @ApiOkResponse({ type: UserSchema })
  create(
    @ApiRequestBody() userSchema: UserSchema,
    @ApiRequestCookie() token: string,
  ) {}
}

describe('OpenApi Scanner', () => {
  let klasses: Klass[];
  let schemas: Record<string, Schema>;

  beforeAll(async () => {
    klasses = (await KlassScanner.scan(__dirname)).filter(
      k => k.name === 'openapi.scanner.test',
    );
    schemas = OpenApiScanner.scanSchemas(klasses);
  });

  it('should ignore class if the class does not been ApiSchema decorated', () => {
    expect(schemas[NotASchema.name]).toBeUndefined();
  });

  it('should scan correct schema', () => {
    expect(schemas[UserSchema.name]).toMatchObject<Schema>({
      properties: {
        id: {
          type: 'number',
        },
        username: {
          type: 'string',
          description: 'username',
        },
        password: {
          type: 'string',
          description: 'test password',
        },
      },
      required: ['username', 'password'],
    });
  });

  it('should handle extend class', () => {
    expect(schemas[AdminSchema.name]).toMatchObject<Schema>({
      title: AdminSchema.name,
      required: ['username', 'password', 'nickname'],
      type: 'object',
      properties: {
        id: { type: 'number' },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        nickname: {
          type: 'string',
        },
      },
    });
  });

  it('should scan correct paths', () => {
    console.log(JSON.stringify(OpenApiScanner.scanPaths(klasses), null, 2));
  });
});
