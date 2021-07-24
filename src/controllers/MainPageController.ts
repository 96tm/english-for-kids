import Controller from './Controller';

import IComponent from '../components/IComponent';

import MainPage from '../pages/MainPage';

export default class MainPageController extends Controller {
  component: MainPage;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new MainPage(global, rootComponent);
  }

  async init(): Promise<void> {
    await this.component.init();
  }
}
