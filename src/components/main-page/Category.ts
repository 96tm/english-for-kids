import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class Category extends Component {
  name: string;

  imagePath: string;

  categoryImage: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    name: string,
    image: string
  ) {
    super(global, rootComponent, 'a', [Constants.CSSClasses.categoryLink], {
      href: `#${Constants.Labels.gameRoute}`,
      'data-category-link-title': name,
    });
    this.categoryImage = new Component(
      global,
      this,
      'img',
      [Constants.CSSClasses.categoryImage],
      { src: image, alt: `Category: ${name}` }
    );
    this.name = name;
    this.imagePath = image;
  }
}

export default Category;
