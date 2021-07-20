import IComponent from '../components/IComponent';
import CategoryCard from '../components/admin-page/CategoryCard';

import Controller from './Controller';

import AdminCategoriesPage from '../pages/AdminCategoriesPage';

import IRESTError from '../models/IRESTError';
import ICategoryDTO from '../models/ICategoryDTO';

import Api from '../util/Api';
import Events from '../util/Events';
import Constants from '../util/constants';

export default class AdminCategoriesController extends Controller {
  component: IComponent;
  page = 1;

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

  private handleScrollToEnd: () => Promise<void> = async () => {
    console.log('gotcha cats');
  };

  private addEventListeners() {
    console.log('cats added');

    Events.scrollToEnd.add(this.handleScrollToEnd);
  }

  private removeEventListeners() {
    console.log('cats removed');

    Events.scrollToEnd.remove(this.handleScrollToEnd);
  }

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

  private async getCategories(
    page = 1,
    limit = Constants.NUMBER_OF_CATEGORIES
  ): Promise<ICategoryDTO[]> {
    let categories: ICategoryDTO[] = [];
    try {
      this.loaderAnimation.render();
      const response = await Api.getCategories(page, limit);
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
    this.addEventListeners();
    this.page = 1;
    const categories = await this.getCategories();
    this.loaderAnimation.render();
    await this.init(categories);
    this.loaderAnimation.remove();
    await super.show();
  }

  hide(): void {
    this.removeEventListeners();
    super.hide();
  }

  async init(categories: ICategoryDTO[]): Promise<void> {
    await (this.component as AdminCategoriesPage).init(categories);
  }
}
