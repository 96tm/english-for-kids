import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class CategoryCard extends Component {
  name: string;
  numberOfWords: number;
  heading: IComponent;
  wordCount: IComponent;
  buttonRemove: IComponent;
  buttonUpdate: IComponent;
  buttonAdd: IComponent;
  bottomButtonsWrap: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    name: string,
    numberOfWords: number
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCategoryCard,
    ]);
    this.name = name;
    this.numberOfWords = numberOfWords;
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardHeading,
    ]);
    this.heading.textContent = name;
    this.wordCount = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardWordCount,
    ]);
    this.wordCount.textContent = String(numberOfWords);
    this.buttonRemove = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonRemove,
    ]);
    this.bottomButtonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
    this.buttonUpdate = new Component(
      global,
      this.bottomButtonsWrap,
      'button',
      [Constants.CSSClasses.adminCategoryCardButtonUpdate]
    );
    this.buttonUpdate.textContent =
      Constants.Labels.adminCategoryCardButtonUpdate;
    this.buttonAdd = new Component(global, this.bottomButtonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonAdd,
    ]);
    this.buttonAdd.textContent = Constants.Labels.adminCategoryCardButtonAdd;
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    switch (target) {
      case this.buttonRemove.element:
        break;
      case this.buttonUpdate.element:
        break;
      case this.buttonAdd.element:
        break;
      default:
        break;
    }
  };
}
