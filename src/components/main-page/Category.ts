import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class Category extends Component {
  name: string;
  imagePath: string;
  categoryImage: IComponent;
  categoryText: IComponent;
  link: IComponent;
  categoryImageWrap: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    name: string,
    image: string
  ) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.categoryWrap]);
    this.name = name;
    this.imagePath = `${Constants.HOMEPAGE}/public/${image}`;
    this.link = new Component(
      global,
      this,
      'a',
      [Constants.CSS_CLASSES.categoryLink],
      {
        href: `#${Constants.LABELS.gameRoute}`,
        'data-category-link-title': name,
      }
    );
    this.categoryImageWrap = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.categoryImageWrap,
    ]);
    this.categoryImage = new Component(
      global,
      this.categoryImageWrap,
      'img',
      [Constants.CSS_CLASSES.categoryImage],
      { src: this.imagePath, alt: `Category: ${name}` }
    );
    this.categoryText = new Component(global, this.categoryImageWrap, 'div', [
      Constants.CSS_CLASSES.categoryText,
    ]);
    this.categoryText.setTextContent(name);
  }
}
