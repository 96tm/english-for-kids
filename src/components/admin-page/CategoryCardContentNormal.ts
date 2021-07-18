import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Events from '../../util/Events';
import CategoryCardButton from '../../models/CategoryCardButton';

export default class CategoryCardContentNormal extends Component {
  heading: IComponent;
  wordsLink: IComponent;
  wordCount: IComponent;
  buttonsWrap: IComponent;
  buttonRemove: IComponent;
  buttonUpdate: IComponent;
  buttonAdd: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private name: string,
    numberOfWords: number
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCategoryCardContentNormal,
    ]);
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
        href: `#${name}/${Constants.Labels.adminWordsRoute}`,
      }
    );
    this.wordCount = new Component(
      global,
      this.wordsLink,
      'div',
      [Constants.CSSClasses.adminCategoryCardWordCount],
      { 'data-title': Constants.Labels.adminCategoryCardWordCountTitle }
    );
    this.wordCount.textContent = String(numberOfWords);
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
    [this.buttonUpdate, this.buttonAdd, this.buttonRemove] =
      this.createButtons();
    this.buttonsWrap.attachTo(this);
    this.addEventListeners();
  }

  private createButtons(): IComponent[] {
    const buttonRemove = this.createButtonRemove();
    const buttonUpdate = this.createButtonUpdate();
    const buttonAdd = this.createButtonAdd(this.name);
    return [buttonUpdate, buttonAdd, buttonRemove];
  }

  private createButtonUpdate(): IComponent {
    const button = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonUpdate,
    ]);
    button.textContent = Constants.Labels.adminCategoryCardButtonUpdate;
    return button;
  }

  private createButtonAdd(categoryName: string): IComponent {
    const button = new Component(
      this.global,
      this.buttonsWrap,
      'a',
      [Constants.CSSClasses.adminCategoryCardButtonAdd],
      { href: `#${categoryName}/${Constants.Labels.adminWordsRoute}` }
    );
    button.textContent = Constants.Labels.adminCategoryCardButtonAdd;
    return button;
  }

  private createButtonRemove(): IComponent {
    return new Component(this.global, this, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonRemove,
    ]);
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
        Events.categoryCardClick.emit({
          button: CategoryCardButton.remove,
          name: this.name,
          newName: '',
        });
        break;
      case this.buttonUpdate.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.update,
          name: this.name,
          newName: '',
        });
        break;
      case this.buttonAdd.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.add,
          name: '',
          newName: '',
        });
        break;
      default:
        break;
    }
  };
}
