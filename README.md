### Install

npm

```
npm i @novajs/common @novajs/analyzer @novajs/core @novajs/openapi
```

yarn

```
yarn add @novajs/common @novajs/analyzer @novajs/core @novajs/openapi
```

### Project Structure

```bash
- src
  - controllers
    - home.controller.ts
  - services
    - home.service.ts
  - dto
    - home.dto.ts
  - app.ts
```

### Controller

in controller, create your route handler

```typescript
// home.controller.ts
import { Controller } from '@novajs/core';
import { ApiGet, ApiRequestParam, ApiOkResponse } from '@novajs/openapi';
import { HomeService } from '../service/home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiGet(':id')
  @ApiOkResponse({ type: Number, description: 'id' })
  async index(@ApiRequestParam() id: number) {
    return this.homeService.getIndex(id);
  }
}
```

### Service

general, we write our application logic on services

```typescript
import { Service } from '@novajs/core';

@Service()
export class HomeService {
  getIndex(id: number) {
    return id;
  }
}
```

### App

```typescript
import { FastifyPlusApplication } from '@novajs/core';
import { DocumentBuild } from '@fastify/swagger';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({
    appRootPath: __dirname,
  });
  // add swagger docs
  DocumentBuild.create(app).build();
  await app.start(3000);
}

bootstrap();
```

now, you can access your api in http://127.0.0.1:3000/1

### todos

- [x] support swagger document
- [ ] support property inject
- [x] get controller route param and generate schema
- [ ] add unit test
- [ ] support generate schema when has generic type
- [ ] auto fill required property for schema
- [ ] exception layer
