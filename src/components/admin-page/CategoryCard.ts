import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class CategoryCard extends Component {
  name: string;
  numberOfWords: number;
  heading: IComponent;
  wordsLink: IComponent;
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
    this.wordsLink = new Component(
      global,
      this,
      'a',
      [Constants.CSSClasses.adminCategoryCardWordCountLink],
      {
        href: `#${this.name.toLowerCase()}/${Constants.Labels.adminWordsRoute}`,
      }
    );
    this.wordCount = new Component(global, this.wordsLink, 'div', [
      Constants.CSSClasses.adminCategoryCardWordCount,
    ]);
    this.wordCount.textContent = String(numberOfWords);
    [
      this.bottomButtonsWrap,
      this.buttonUpdate,
      this.buttonAdd,
      this.buttonRemove,
    ] = this.createButtons();
    this.addEventListeners();
  }

  private createButtons(): IComponent[] {
    const buttonRemove = new Component(this.global, this, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonRemove,
    ]);
    const bottomButtonsWrap = new Component(this.global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
    const buttonUpdate = new Component(
      this.global,
      this.bottomButtonsWrap,
      'button',
      [Constants.CSSClasses.adminCategoryCardButtonUpdate]
    );
    buttonUpdate.textContent = Constants.Labels.adminCategoryCardButtonUpdate;
    const buttonAdd = new Component(this.global, bottomButtonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonAdd,
    ]);
    buttonAdd.textContent = Constants.Labels.adminCategoryCardButtonAdd;
    return [bottomButtonsWrap, buttonUpdate, buttonAdd, buttonRemove];
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
      case this.wordCount.element:
        break;
      default:
        break;
    }
  };
}
