import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import Events from '../util/Events';
import Api from '../util/Api';
import IRESTError from '../models/IRESTError';
import CategoryCard from '../components/admin-page/CategoryCard';
import ICategoryDTO from '../models/ICategoryDTO';

export default class AdminCategoriesController extends Controller {
  component: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent | null,
    private loaderAnimation: IComponent
  ) {
    super();
    this.component = new AdminCategoriesPage(global, rootComponent);
    Events.categoryUpdate.add(this.handleCategoryUpdate);
    Events.categoryCreate.add(this.handleCategoryCreate);
    Events.categoryRemove.add(this.handleCategoryRemove);
  }

  private handleCategoryUpdate: ({
    name,
    newName,
  }: {
    name: string;
    newName: string;
  }) => Promise<void> = async ({ name, newName }) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.updateCategory(name, newName);
      if (response.ok) {
        const updatedCard: ICategoryDTO = await response.json();
        const categoryCard = (
          this.component as AdminCategoriesPage
        ).getCategoryCard(name);
        (categoryCard as CategoryCard)?.setNormalMode(
          updatedCard.name,
          updatedCard.numberOfWords
        );
        Events.adminMessageShow.emit('Category updated');
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
  };

  private handleCategoryCreate: (name: string) => Promise<void> = async (
    name
  ) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.createCategory(name);
      if (response.ok) {
        const categories = await this.getCategories();
        await this.init(categories);
        Events.adminMessageShow.emit('Category created');
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
  };

  private handleCategoryRemove: (name: string) => Promise<void> = async (
    name
  ) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.removeCategory(name);
      if (response.ok) {
        const removedCategory: ICategoryDTO = await response.json();
        (this.component as AdminCategoriesPage).getCategoryCard(name)?.remove();
        (this.component as AdminCategoriesPage).categories = (
          this.component as AdminCategoriesPage
        ).categories.filter(
          (category) => (category as CategoryCard).name !== removedCategory.name
        );
        Events.adminMessageShow.emit('Category removed');
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
  };

  private async getCategories(): Promise<ICategoryDTO[]> {
    let categories: ICategoryDTO[] = [];
    try {
      this.loaderAnimation.render();
      const response = await Api.getAllCategories();
      if (response.ok) {
        categories = await response.json();
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
    return categories;
  }

  async show(): Promise<void> {
    const categories = await this.getCategories();
    this.loaderAnimation.render();
    await this.init(categories);
    this.loaderAnimation.remove();
    super.show();
  }

  async init(categories: ICategoryDTO[]): Promise<void> {
    await (this.component as AdminCategoriesPage).init(categories);
  }
}
