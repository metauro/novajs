### @novajs/testing

#### usage

```typescript
import { Testing } from '@novajs/testing';
 import { HttpRequest } from "@novajs/server-request";

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
