import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';

export default class AdminEditCategoryPage extends Component {
  heading: IComponent;
  categories: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminEditCategory,
    ]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminEditCategoryHeading,
    ]);
  }
}
