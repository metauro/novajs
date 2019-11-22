### Install

npm

```
npm i fastify-plus
```

yarn

```
yarn add fastify-plus
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
import { Controller, Get, RequestQuery } from 'fastify-plus';
import { HomeGetIndexRequest, HomeGetIndexResponse } from '../dto/home.dto';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  index(
    @RequestQuery() homeGetIndexRequest: HomeGetIndexRequest,
  ): HomeGetIndexResponse {
    return this.homeService.getIndex(homeGetIndexRequest);
  }
}
```

### Service

general, we write our application logic on services

```typescript
import { Service } from 'fastify-plus';
import { HomeGetIndexRequest, HomeGetIndexResponse } from '../dto/home.dto';

@Service()
export class HomeService {
  getIndex(homeGetIndexRequest: HomeGetIndexRequest): HomeGetIndexResponse {
    return {
      name: homeGetIndexRequest.id,
    };
  }
}
```

### App

```typescript
import { FastifyPlusApplication } from 'fastify-plus';

async function bootstrap() {
  const app = new FastifyPlusApplication({
    appRootPath: __dirname,
  });
  await app.start(3000);
}

bootstrap();
```

now, you can access your api in http://127.0.0.1:3000/?id=2

### todos

- [ ] support swagger document
- [ ] support property inject
- [ ] get controller route param and generate schema
