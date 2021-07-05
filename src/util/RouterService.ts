import { RoutingTable } from './RoutingTable';
import Events from './Events';
import Constants from './constants';

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
    const hashString = window.location.hash;
    if (hashString) {
      await this.showRoute(hashString.slice(1));
    } else {
      await this.showRoute(this.currentRoute);
    }
  }
}

const RouterService = new Router(window, 'main');

export default RouterService;
