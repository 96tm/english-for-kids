import Controller from './Controller';
import IComponent from '../components/IComponent';
import ContainerPage from '../pages/ContainerPage';

class ContainerController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new ContainerPage(global, rootComponent);
  }

  async init(): Promise<void> {
    ((await this.component) as ContainerPage).init();
  }
}

export default ContainerController;
