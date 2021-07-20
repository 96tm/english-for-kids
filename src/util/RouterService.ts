import Events from './Events';

import Constants from './constants';

import RoutingRecord from './RoutingRecord';
import userService from './UserService';

import IController from '../controllers/IController';

class Router {
  guards = new Set<IController>();

  constructor(
    private global: Window,
    public currentPattern: string,
    private routingRecords: RoutingRecord[] = []
  ) {}

  async showRoute(route: string): Promise<void> {
    const decodedRoute = decodeURIComponent(route);
    const controller = this.getController(decodedRoute);
    if (
      controller &&
      !(this.guards.has(controller) && !userService.isAuthenticated)
    ) {
      const currentController = this.getController(
        this.currentPattern
      ) as IController;
      currentController.hide();
      this.currentPattern = decodedRoute;
      await controller.show();
      Events.routeChange.emit(decodedRoute);
    } else {
      this.showRoute(Constants.Labels.mainRoute);
    }
  }

  getController(route: string): IController | undefined {
    const routingRecord = this.routingRecords.find((record) => {
      const regexp = new RegExp(record.pattern);
      return regexp.test(route);
    });
    return routingRecord?.controller;
  }

  setHash(hash: string): void {
    this.global.location.hash = hash;
  }

  addOneRoutePattern(routingRecord: RoutingRecord) {
    this.routingRecords.push(routingRecord);
    routingRecord.controller.hide();
    if (routingRecord?.options?.guard) {
      this.guards.add(routingRecord.controller);
    }
  }

  addRoutePatterns(routingRecords: RoutingRecord[]) {
    routingRecords.forEach((routingRecord) => {
      this.addOneRoutePattern(routingRecord);
    });
  }

  async init(routes: RoutingRecord[]): Promise<void> {
    this.addRoutePatterns(routes);
    this.global.addEventListener('popstate', async () => {
      if (!this.global.location.hash) {
        const thisGlobal = this.global;
        thisGlobal.location.hash = this.currentPattern;
      } else {
        await this.showRoute(this.global.location.hash.slice(1));
      }
    });
    this.setHash(this.currentPattern);
  }
}

const RouterService = new Router(window, Constants.Labels.mainRoute);

export default RouterService;
