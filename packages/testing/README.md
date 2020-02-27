### @fastify-plus/testing

#### usage

```typescript
import { Testing } from '@fastify-plus/testing';
 import { HttpRequest } from "@fastify-plus/server-request";

@Controller()
class TestController {
  @Get()
  get(req: HttpRequest) {}
}

describe("Test", () => {
  let t: Testing;
  
  beforeEach(async () => {
    t = Testing.create(app)
  })

  it("example", () => {

  })
})
```
