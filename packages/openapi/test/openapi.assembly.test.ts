import {
  ApiDelete,
  ApiGet,
  ApiHead,
  ApiOptions,
  ApiPatch,
  ApiPath,
  ApiPost,
  ApiPut,
  ApiSchema,
  ApiTrace,
  OpenApiAssembly,
  Schema,
} from '../lib';

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
    @ApiPath('tests')
    class TestController {
      @ApiPost()
      create() {}

      @ApiGet()
      getList() {}

      @ApiGet('{id}')
      getOne() {}

      @ApiPut('{id}')
      update() {}

      @ApiPatch('{id}')
      partialUpdate() {}

      @ApiDelete('{id}')
      delete() {}

      @ApiOptions()
      options() {}

      @ApiHead()
      head() {}

      @ApiTrace()
      trace() {}
    }
  });
});
