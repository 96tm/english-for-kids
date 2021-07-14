import Events from './Events';
import IController from '../controllers/IController';
import RoutingRecord from './RoutingRecord';
import Constants from './constants';

class Router {
  constructor(
    private global: Window,
    public currentPattern: string,
    private routingRecords: RoutingRecord[] = []
  ) {}

  async showRoute(route: string): Promise<void> {
    const decodedRoute = decodeURIComponent(route);
    const controller = this.getController(decodedRoute);
    if (controller) {
      const currentController = this.getController(
        this.currentPattern
      ) as IController;
      currentController.hide();
      this.currentPattern = decodedRoute;
      await controller.show();
      Events.routeChange.emit(decodedRoute);
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

  addRoutePatterns(routingRecords: RoutingRecord[]) {
    routingRecords.forEach((routingRecord) => {
      this.routingRecords.push(routingRecord);
      routingRecord.controller.hide();
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
