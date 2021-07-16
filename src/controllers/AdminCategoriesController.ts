import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import Events from '../util/Events';
import Api from '../util/Api';

export default class AdminCategoriesController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new AdminCategoriesPage(global, rootComponent);
    Events.categoryUpdate.add(this.handleCategoryUpdate);
    Events.categoryCreate.add(this.handleCategoryCreate);
    Events.categoryRemove.add(this.handleCategoryRemove);
  }

  // private handleRouteChange: (route: string) => Promise<void> = async (
  //   route
  // ) => {
  //   if (
  //     route.split('/').slice(-1)[0] === Constants.Labels.adminCategoriesRoute
  //   ) {
  //     await this.init(route.split('/')[0]);
  //   }
  // };

  private handleCategoryUpdate: ({
    name,
    newName,
  }: {
    name: string;
    newName: string;
  }) => Promise<void> = async ({ name, newName }) => {
    await Api.updateCategory(name, newName);
  };

  private handleCategoryCreate: (name: string) => Promise<void> = async (
    name
  ) => {
    await Api.createCategory(name);
    await (this.component as AdminCategoriesPage).init();
  };

  private handleCategoryRemove: (name: string) => Promise<void> = async (
    name
  ) => {
    await Api.removeCategory(name);
  };

  async show(): Promise<void> {
    await this.init();
    super.show();
  }

  async init(): Promise<void> {
    await (this.component as AdminCategoriesPage).init();
  }
}
