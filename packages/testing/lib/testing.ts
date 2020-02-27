import { ControllerExplorer } from '@novajs/core/dist/explorers';
import { Class } from 'utility-types';
import supertest from 'supertest';
import { Application } from '@novajs/core';

export class Testing {
  constructor(
    private readonly app: Application,
    private readonly agent: supertest.SuperTest<supertest.Test>,
  ) {
    const controllerExplorer = new ControllerExplorer(app.getContext());
    for (const k of app.getContext().klasses) {
      for (const r of controllerExplorer.exploreRoutes(k)) {
        // hack all route handler
        r.handler = async (...args: any[]) => {
          const params = controllerExplorer.exploreRouteParams(r);
          const test = agent[r.method](r.path);
          let path = r.path;
          params.forEach((p, i) => {
            switch (p.in) {
              case 'path':
                path = path.replace(`:${p.name}`, args[i]);
                break;
              case 'query':
                test.query(args[i]);
                break;
              case 'body':
                test.send(args[i]);
                break;
              case 'cookie':
              case 'header':
                test.set(args[i]);
                break;
            }
          });
          return test;
        };
      }
    }
  }

  get<T extends Class<any>>(obj: T): InstanceType<T> {
    return this.app.getContext().injector.get(obj);
  }

  static create(app: Application) {
    return new Testing(app, supertest.agent(app.getContext().adapter.server));
  }

  async close() {
    return this.app.close();
  }
}
