import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';

export default class AdminCategoriesController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new AdminCategoriesPage(global, rootComponent);
  }
}
