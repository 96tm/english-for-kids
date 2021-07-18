import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import IValidatedInput from './IValidatedInput';
import Events from '../../util/Events';

export default abstract class BaseWordCardContent extends Component {
  buttonsWrap: IComponent;
  abstract submit: IComponent;
  abstract inputWord: IComponent;
  abstract inputTranslation: IComponent;
  abstract inputAudio: IComponent;
  abstract inputImage: IComponent;

  constructor(global: Window, rootComponent: IComponent, classes: string[]) {
    super(global, rootComponent, 'div', classes);
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
  }

  protected handleInputChange: (event: Event) => void = (event) => {
    const wordValidationResults = (
      this.inputWord as IValidatedInput
    ).validate();
    const translationValidationResults = (
      this.inputTranslation as IValidatedInput
    ).validate();
    const audioValidationResults = (
      this.inputAudio as IValidatedInput
    ).validate();
    const imageValidationResults = (
      this.inputImage as IValidatedInput
    ).validate();
    const results = [
      ...wordValidationResults,
      ...translationValidationResults,
      ...audioValidationResults,
      ...imageValidationResults,
    ];
    if (results.every((result) => result.isValid)) {
      this.submit.enable();
    } else {
      this.submit.disable();
      const errorResults = results
        .filter((result) => result.errorMessage)
        .map((result) => result.errorMessage);
      errorResults.forEach((result) => {
        Events.adminErrorShow.emit(result);
      });
    }
  };
}
