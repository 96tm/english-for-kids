import Component from '../components/Component';
import IComponent from '../components/IComponent';
import CategoryCard from '../components/admin-page/CategoryCard';

import ICategoryDTO from '../models/ICategoryDTO';
import CategoryCardButton from '../models/CategoryCardButton';

import Events from '../util/Events';

import Constants from '../util/constants';

export default class AdminCategoriesPage extends Component {
  categories: IComponent[] = [];
  createCategoryCard: IComponent;
  categoriesWrap: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminCategories]);
    this.categoriesWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoriesWrap,
    ]);
    this.createCategoryCard = new CategoryCard(global, this.categoriesWrap);
    (this.createCategoryCard as CategoryCard).setAddMode();
    Events.categoryCardClick.add(this.handleCategoryCardClick);
  }

  getCategoryCard(name: string): IComponent | undefined {
    return this.categories.find(
      (category) => (category as CategoryCard).name === name
    );
  }

  private handleCategoryCardClick: (data: {
    button: CategoryCardButton;
    name: string;
    newName: string;
  }) => void = (data) => {
    const categoryCard = this.getCategoryCard(data.name) as CategoryCard;
    switch (data.button) {
      case CategoryCardButton.update:
        categoryCard.setEditMode();
        break;
      case CategoryCardButton.cancel:
        if (categoryCard) {
          categoryCard.setNormalMode();
        } else {
          (this.createCategoryCard as CategoryCard).setAddMode();
        }
        break;
      case CategoryCardButton.save:
        categoryCard.setNormalMode();
        Events.categoryUpdate.emit({ ...data });
        break;
      case CategoryCardButton.create: {
        (this.createCategoryCard as CategoryCard).setAddMode();
        Events.categoryCreate.emit(data.newName);
        break;
      }
      case CategoryCardButton.add:
        (this.createCategoryCard as CategoryCard).setCreateMode();
        break;
      case CategoryCardButton.remove: {
        Events.categoryRemove.emit(data.name);
        break;
      }
      default:
        break;
    }
  };

  private addOneCategory(name: string, numberOfWords: number): IComponent {
    const category = new CategoryCard(
      this.global,
      this.categoriesWrap,
      name,
      numberOfWords
    );
    this.categories.push(category);
    return category;
  }

  async init(categories: ICategoryDTO[]): Promise<void> {
    this.categoriesWrap.element.innerHTML = '';
    this.categories = [];
    categories.forEach((category) =>
      this.addOneCategory(category.name, category.numberOfWords)
    );
    (this.createCategoryCard as CategoryCard).setAddMode();
    this.createCategoryCard.attachTo(this.categoriesWrap);
  }
}
