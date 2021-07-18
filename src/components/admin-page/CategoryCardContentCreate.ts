import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import BaseCategoryCardContent from './BaseCategoryCardContent';
import Events from '../../util/Events';
import CategoryCardButton from '../../models/CategoryCardButton';
import TextInput from './TextInput';
import { validateNonEmpty, validateEnglishWord } from '../../util/Validators';

export default class CategoryCardContentCreate extends BaseCategoryCardContent {
  input: IComponent;
  buttonCreate: IComponent;
  buttonCancel: IComponent;
  submit: IComponent;

  constructor(global: Window, rootComponent: IComponent, private name: string) {
    super(global, rootComponent, [
      Constants.CSSClasses.adminCategoryCardContentEdit,
    ]);
    [this.buttonCreate, this.buttonCancel] = this.createButtons();
    this.submit = this.buttonCreate;
    this.input = new TextInput(
      global,
      this,
      Constants.Labels.adminCategoryEditInputId,
      Constants.Labels.adminCategoryEditInputLabel,
      [validateNonEmpty, validateEnglishWord(Constants.Labels.category)]
    );
    this.addEventListeners();
    this.buttonsWrap.attachTo(this);
    this.submit.disable();
  }

  private createButtons(): IComponent[] {
    const buttonCancel = this.createButtonCancel();
    const buttonCreate = this.createButtonCreate();
    return [buttonCreate, buttonCancel];
  }

  private createButtonCreate(): IComponent {
    const button = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonCreate,
    ]);
    button.textContent = Constants.Labels.adminCategoryCardButtonCreate;
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

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    switch (target) {
      case this.buttonCreate.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.create,
          name: '',
          newName: (this.input as TextInput).value,
        });
        break;
      case this.buttonCancel.element:
        Events.categoryCardClick.emit({
          button: CategoryCardButton.cancel,
          name: '',
          newName: '',
        });
        break;
      default:
        break;
    }
  };
}
