### Install

npm

```
npm i @sojs/common @sojs/analyzer @sojs/core @sojs/openapi
```

yarn

```
yarn add @sojs/common @sojs/analyzer @sojs/core @sojs/openapi
```

### Example

```typescript
import { Application, Controller } from '@sojs/core';
import { ApiGet } from '@sojs/openapi';
import { FastifyAdapter } from '@sojs/platform-fastify' 

@Controller()
export class HomeController {
  @ApiGet()
  index() {
    return { hello: 'world' };
  }
}


async function bootstrap() {
  const app = await Application.create({
    appRootPath: __dirname,
    adapter: new FastifyAdapter(),
  })
  await app.listen(3000)
}

bootstrap()
```

now, you can access your api in http://127.0.0.1:3000/1

### todos

- [x] support swagger document
- [ ] support property inject
- [x] get controller route param and generate schema
- [ ] add unit test
- [ ] support generate schema when has generic type
- [ ] auto fill required property for schema
- [x] exception layer

