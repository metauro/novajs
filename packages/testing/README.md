### @sojs/testing

#### usage

```typescript
import { Testing } from '@sojs/testing';
 import { HttpRequest } from "@sojs/server-request";

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
