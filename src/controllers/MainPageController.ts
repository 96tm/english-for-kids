import Controller from './Controller';
import IComponent from '../components/IComponent';
import MainPage from '../pages/MainPage';

class MainPageController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new MainPage(global, rootComponent);
  }

  async init(): Promise<void> {
    await (this.component as MainPage).init();
  }
}

export default MainPageController;
