### @sojs/swagger

Swagger Document

### Usage

```typescript
import { FastifyPlusApplication } from '@sojs/core';
import { DocumentBuilder } from '@sojs/swagger';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({
    appRootPath: __dirname,
  });
  DocumentBuilder.create(app).build();
}

bootstrap();
```
