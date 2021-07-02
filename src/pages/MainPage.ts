import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Constants from '../util/constants';
import Category from '../components/main-page/Category';

export default class MainPage extends Component {
  categories: IComponent[] = [];

  constructor(global: Window, rootView: IComponent | null) {
    super(global, rootView, 'div', [Constants.CSSClasses.categoriesWrap]);
  }

  async init(): Promise<void> {
    const categories = await fetch('../../images.json').then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((key) => {
      const action = this.addOneCategory(key, key);
      action.textContent = key;
    });
  }

  addOneCategory(name: string, image: string): IComponent {
    const category = new Category(this.global, this, name, image);
    this.categories.push(category);
    return category;
  }
}
