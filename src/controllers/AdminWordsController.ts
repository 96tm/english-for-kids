import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminWordsPage from '../pages/AdminWordsPage';
import Events from '../util/Events';
import Constants from '../util/constants';

export default class AdminWordsController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new AdminWordsPage(global, rootComponent);
    Events.routeChange.add(this.handleRouteChange);
  }

  private handleRouteChange: (route: string) => void = async (route) => {
    console.log('words route change');

    if (route.split('/').slice(-1)[0] === Constants.Labels.adminWordsRoute) {
      console.log('init');

      await this.init(route.split('/')[0]);
    }
  };

  async init(category: string): Promise<void> {
    await (this.component as AdminWordsPage).init(category);
  }
}
