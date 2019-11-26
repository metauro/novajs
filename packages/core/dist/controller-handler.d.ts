import { ApplicationContext, ControllerRoute } from './interfaces';
export declare class ControllerHandler {
  protected readonly ctx: ApplicationContext;
  constructor(ctx: ApplicationContext);
  registerControllers(): Promise<void>;
  protected getRouteHandler(route: ControllerRoute): Function;
}
