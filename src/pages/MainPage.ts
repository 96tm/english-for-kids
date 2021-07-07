import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Constants from '../util/constants';
import Category from '../components/main-page/Category';
import Events from '../util/Events';

export default class MainPage extends Component {
  categories: IComponent[] = [];

  constructor(global: Window, rootView: IComponent | null) {
    super(global, rootView, 'div', [Constants.CSSClasses.categoriesWrap]);
  }

  async init(): Promise<void> {
    const categories = await fetch('../../cards.json').then((response) =>
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
