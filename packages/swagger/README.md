### @novajs/swagger

Swagger Document

### Usage

```typescript
import { FastifyPlusApplication } from '@novajs/core';
import { DocumentBuilder } from '@novajs/swagger';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({
    appRootPath: __dirname,
  });
  DocumentBuilder.create(app).build();
}

bootstrap();
```
