import {
  ApplicationAdapterRouteOptions,
  ApplicationContext,
  ControllerRoute,
} from '../interfaces';

export abstract class ControllerHandlerAdapter {
  constructor(protected readonly ctx: ApplicationContext) {}
  /**
   * parseRouteOptions will return route options and use for application.route
   * @param route
   */
  abstract parseRouteOptions(
    route: ControllerRoute,
  ): ApplicationAdapterRouteOptions;
}
