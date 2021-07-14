import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import CategoryCard from '../components/admin-page/CategoryCard';
import CreateCategoryCard from '../components/admin-page/CreateCategoryCard';

export default class AdminCategoriesPage extends Component {
  categories: IComponent[] = [];
  createCategoryCard: IComponent;
  categoriesWrap: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminCategories]);
    this.categoriesWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoriesWrap,
    ]);
    this.createCategoryCard = new CreateCategoryCard(
      global,
      this.categoriesWrap
    );
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {};

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
    const categories = await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    Object.keys(categories).forEach((key) => {
      this.addOneCategory(key, categories[key].length);
    });
    this.createCategoryCard.remove();
    this.createCategoryCard = new CreateCategoryCard(
      this.global,
      this.categoriesWrap
    );
  }
}
