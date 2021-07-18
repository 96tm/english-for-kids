import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import IValidatedInput from './IValidatedInput';
import Events from '../../util/Events';

export default abstract class BaseCategoryCardContent extends Component {
  buttonsWrap: IComponent;
  abstract submit: IComponent;
  abstract input: IComponent;

  constructor(global: Window, rootComponent: IComponent, classes: string[]) {
    super(global, rootComponent, 'div', classes);
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
  }

  protected createButtonCancel(): IComponent {
    const button = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonCancel,
    ]);
    button.textContent = Constants.Labels.adminCategoryCardButtonCancel;
    return button;
  }

  protected handleInputChange: (event: Event) => void = (event) => {
    const categoryValidationResults = (
      this.input as IValidatedInput
    ).validate();
    if (categoryValidationResults.every((result) => result.isValid)) {
      this.submit.enable();
    } else {
      this.submit.disable();
      const errorResults = categoryValidationResults
        .filter((result) => result.errorMessage)
        .map((result) => result.errorMessage);
      errorResults.forEach((result) => {
        Events.adminErrorShow.emit(result);
      });
    }
  };
}
