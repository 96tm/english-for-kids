import IComponent from '../IComponent';
import Component from '../Component';

import CategoryCardContentNormal from './CategoryCardContentNormal';
import CategoryCardContentEdit from './CategoryCardContentEdit';
import CategoryCardContentAdd from './CategoryCardContentAdd';
import CategoryCardContentCreate from './CategoryCardContentCreate';

import Constants from '../../util/constants';

export default class CategoryCard extends Component {
  name: string;
  numberOfWords: number;
  content: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    name = '',
    numberOfWords = 0
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCategoryCard,
    ]);
    this.name = name;
    this.numberOfWords = numberOfWords;
    this.content = new CategoryCardContentNormal(
      global,
      this,
      name,
      numberOfWords
    );
  }

  setNormalMode(name = this.name, numberOfWords = this.numberOfWords): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.name = name;
    this.numberOfWords = numberOfWords;
    this.content = new CategoryCardContentNormal(
      this.global,
      this,
      this.name,
      this.numberOfWords
    );
  }

  setEditMode(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new CategoryCardContentEdit(this.global, this, this.name);
  }

  setCreateMode(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new CategoryCardContentCreate(this.global, this, this.name);
  }

  setAddMode(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new CategoryCardContentAdd(this.global, this);
  }
}
