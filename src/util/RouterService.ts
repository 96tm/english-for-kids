import { RoutingTable } from './RoutingTable';

import Events from './Events';

class Router {
  constructor(
    private global: Window,
    public currentRoute: string,
    private routes: RoutingTable = {}
  ) {}

  async showRoute(route: string): Promise<void> {
    if (this.routes[route]) {
      this.routes[this.currentRoute].hide();
      this.currentRoute = route;
      await this.routes[route].show();
      Events.routeChange.emit(route);
    }
  }

  setHash(hash: string): void {
    this.global.location.hash = hash;
  }

  addRoutes(routes: RoutingTable) {
    Object.keys(routes).forEach((routeName) => {
      this.routes[routeName] = routes[routeName];
      routes[routeName].hide();
    });
  }

  async init(routes: RoutingTable): Promise<void> {
    this.addRoutes(routes);
    this.global.addEventListener('popstate', async () => {
      if (!this.global.location.hash) {
        const thisGlobal = this.global;
        thisGlobal.location.hash = this.currentRoute;
      } else {
        await this.showRoute(this.global.location.hash.slice(1));
      }
    });
    this.setHash(this.currentRoute);
  }
}

const RouterService = new Router(window, 'main');

export default RouterService;
