import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Category from '../components/main-page/Category';

import Constants from '../util/constants';

import Events from '../util/Events';
import ICategoryDTO from '../models/ICategoryDTO';

import noImage from '../assets/icons/icons8-no-image.png';

export default class MainPage extends Component {
  categories: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.categoriesWrap]);
  }

  init(categories: ICategoryDTO[]): void {
    this.element.innerHTML = '';
    categories.forEach((category) => {
      this.addOneCategory(category.name, category.randomWordImage || noImage);
    });
    this.addEventListeners();
  }

  addOneCategory(name: string, image: string): void {
    const category = new Category(this.global, this, name, image);
    this.categories.push(category);
  }

  addEventListeners(): void {
    this.element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const wrap = target.closest(`.${Constants.CSSClasses.categoryWrap}`);
      if (wrap) {
        const link = wrap.querySelector(
          `.${Constants.CSSClasses.categoryLink}`
        ) as HTMLElement;
        Events.menuClick.emit(link.dataset.categoryLinkTitle as string);
      }
    });
  }
}
