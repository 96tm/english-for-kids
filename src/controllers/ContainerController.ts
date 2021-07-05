import Controller from './Controller';
import IComponent from '../components/IComponent';
import ContainerPage from '../pages/ContainerPage';
import Events from '../util/Events';

class ContainerController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new ContainerPage(global, rootComponent);
    Events.menuClick.add(this.handleMenuClick.bind(this));
  }

  private handleMenuClick(menuItem: string): void {
    const { gameMenu } = this.component as ContainerPage;
    gameMenu.setActiveMenuItem(menuItem);
  }

  async init(): Promise<void> {
    ((await this.component) as ContainerPage).init();
  }
}

export default ContainerController;
