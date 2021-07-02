import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class Category extends Component {
  name: string;

  constructor(
    global: Window,
    rootComponent: IComponent,
    name: string,
    image: string
  ) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.category]);
    this.name = name;
  }
}

export default Category;
