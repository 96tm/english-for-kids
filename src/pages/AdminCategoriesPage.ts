import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';

export default class AdminCategoriesPage extends Component {
  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminCategories]);
  }
}
