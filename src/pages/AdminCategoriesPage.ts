import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import CategoryCard from '../components/admin-page/CategoryCard';
import Events from '../util/Events';
import CategoryCardButton from '../models/CategoryCardButton';
import Api from '../util/Api';

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
    // this.addEventListeners();
    Events.categoryCardClick.add(this.handleCategoryCardClick);
  }

  private handleCategoryCardClick: (data: {
    button: CategoryCardButton;
    name: string;
    newName: string;
  }) => void = (data) => {
    const categoryCard = this.categories.find(
      (category) => (category as CategoryCard).name === data.name
    ) as CategoryCard;
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
        categoryCard.setNormalMode(data.newName);
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
        this.categories = this.categories.filter(
          (category) => category !== categoryCard
        );
        categoryCard.remove();
        Events.categoryRemove.emit(data.name);
        break;
      }
      default:
        break;
    }
  };

  // private addEventListeners(): void {
  //   this.element.addEventListener('click', this.handleClick);
  // }

  // private removeEventListeners(): void {
  //   this.element.removeEventListener('click', this.handleClick);
  // }

  // private handleClick: (event: MouseEvent) => void = (event) => {
  //   const target = event.target as HTMLElement;
  // };

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

  async init(): Promise<void> {
    this.categoriesWrap.element.innerHTML = '';
    const categories = await Api.getAllCategories();
    this.categories = [];
    categories.forEach((category) =>
      this.addOneCategory(category.name, category.numberOfWords)
    );
    this.createCategoryCard.attachTo(this.categoriesWrap);
  }
}
