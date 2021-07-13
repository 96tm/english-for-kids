import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';

export default class AdminCategoriesController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new AdminCategoriesPage(global, rootComponent);
  }

  async show(): Promise<void> {
    await this.init();
    super.show();
  }

  async init(): Promise<void> {
    await (this.component as AdminCategoriesPage).init();
  }
}
