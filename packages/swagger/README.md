### @fastify-plus/swagger

Swagger Document

### Usage

```typescript
import { FastifyPlusApplication } from '@fastify-plus/core';
import { DocumentBuilder } from '@fastify-plus/swagger';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({
    appRootPath: __dirname,
  });
  DocumentBuilder.create(app).build();
}

bootstrap();
```
