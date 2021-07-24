import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Category from '../components/main-page/Category';

import Constants from '../util/constants';

import Events from '../util/Events';
import Api from '../util/Api';

export default class MainPage extends Component {
  categories: IComponent[] = [];

  constructor(global: Window, rootView: IComponent | null) {
    super(global, rootView, 'div', [Constants.CSS_CLASSES.categoriesWrap]);
  }

  async init(): Promise<void> {
    const categories = await Api.getCategories().then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((key) => {
      const randomIndex = Math.floor(Math.random() * categories[key].length);
      const { image } = categories[key][randomIndex];
      this.addOneCategory(key, image);
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
      const wrap = target.closest(`.${Constants.CSS_CLASSES.categoryWrap}`);
      if (wrap) {
        const link = wrap.querySelector(
          `.${Constants.CSS_CLASSES.categoryLink}`
        ) as HTMLElement;
        Events.menuClick.emit(link.dataset.categoryLinkTitle as string);
      }
    });
  }
}
