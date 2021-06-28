import { RoutingTable } from './RoutingTable';

class Router {
  constructor(
    private global: Window,
    public currentRoute: string,
    private routes: RoutingTable = {}
  ) {}

  showRoute(route: string): void {
    if (this.routes[route]) {
      this.routes[this.currentRoute].hide();
      this.currentRoute = route;
      this.routes[route].show();
    }
  }

  addRoutes(routes: RoutingTable) {
    Object.keys(routes).forEach((routeName) => {
      this.routes[routeName] = routes[routeName];
    });
  }

  init(routes: RoutingTable): void {
    this.addRoutes(routes);
    this.global.addEventListener('popstate', () => {
      if (!this.global.location.hash) {
        const thisGlobal = this.global;
        thisGlobal.location.hash = this.currentRoute;
      } else {
        this.showRoute(this.global.location.hash.slice(1));
      }
    });
    const hashString = window.location.hash;
    if (hashString) {
      this.showRoute(hashString.slice(1));
    } else {
      this.showRoute(this.currentRoute);
    }
  }
}

const RouterService = new Router(window, 'game');

export default RouterService;
