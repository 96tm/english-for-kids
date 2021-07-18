import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import BaseCategoryCardContent from './BaseCategoryCardContent';
import Events from '../../util/Events';
import CategoryCardButton from '../../models/CategoryCardButton';
import TextInput from './TextInput';
import { validateNonEmpty, validateEnglishWord } from '../../util/Validators';

export default class CategoryCardContentEdit extends BaseCategoryCardContent {
  input: IComponent;
  buttonSave: IComponent;
  buttonCancel: IComponent;
  submit: IComponent;

  constructor(global: Window, rootComponent: IComponent, private name: string) {
    super(global, rootComponent, [
      Constants.CSSClasses.adminCategoryCardContentEdit,
    ]);
    [this.buttonSave, this.buttonCancel] = this.createButtons();
    this.submit = this.buttonSave;
    this.input = new TextInput(
      global,
      this,
      Constants.Labels.adminCategoryEditInputId,
      Constants.Labels.adminCategoryEditInputLabel,
      [validateNonEmpty, validateEnglishWord(Constants.Labels.category)],
      name
    );
    this.addEventListeners();
    this.buttonsWrap.attachTo(this);
  }

  private createButtons(): IComponent[] {
    const buttonCancel = this.createButtonCancel();
    const buttonSave = this.createButtonSave();
    return [buttonSave, buttonCancel];
  }

  private createButtonSave(): IComponent {
    const button = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonSave,
    ]);
    button.textContent = Constants.Labels.adminCategoryCardButtonSave;
    return button;
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('input', this.handleInputChange);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('input', this.handleInputChange);
  }

  // private handleInputChange: (event: Event) => void = (event) => {
  //   if ((this.input as TextInput).value) {
  //     this.buttonSave.enable();
  //   } else {
  //     this.buttonSave.disable();
  //   }
  // };

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    switch (target) {
      case this.buttonSave.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.save,
          name: this.name,
          newName: (this.input as TextInput).value,
        });
        break;
      case this.buttonCancel.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.cancel,
          name: this.name,
          newName: '',
        });
        break;
      default:
        break;
    }
  };
}
