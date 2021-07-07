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
    super(global, rootComponent, 'div', [Constants.CSSClasses.categoryWrap]);
    this.link = new Component(
      global,
      this,
      'a',
      [Constants.CSSClasses.categoryLink],
      {
        href: `#${Constants.Labels.gameRoute}`,
        'data-category-link-title': name,
      }
    );
    this.categoryImageWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.categoryImageWrap,
    ]);
    this.categoryImage = new Component(
      global,
      this.categoryImageWrap,
      'img',
      [Constants.CSSClasses.categoryImage],
      { src: image, alt: `Category: ${name}` }
    );
    this.categoryText = new Component(global, this.categoryImageWrap, 'div', [
      Constants.CSSClasses.categoryText,
    ]);
    this.categoryText.textContent = name;
    this.name = name;
    this.imagePath = image;
  }
}
