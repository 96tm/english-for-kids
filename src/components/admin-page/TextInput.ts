import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import IInputValidationResult from './IInputValidationResult';
import BaseValidatedInput from './BaseInput';

export default class TextInput extends BaseValidatedInput {
  input: IComponent;
  label: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    inputId: string,
    labelText: string,
    public validatingFunctions: Array<() => IInputValidationResult> = [],
    value = ''
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCardInputWrap,
    ]);
    this.input = new Component(
      global,
      this,
      'input',
      [Constants.CSSClasses.adminCardInput],
      {
        id: inputId,
        placeholder: ' ',
        value,
      }
    );
    this.input.element.focus();
    this.label = new Component(
      global,
      this,
      'label',
      [Constants.CSSClasses.adminCardInputLabel],
      { for: inputId }
    );
    this.label.textContent = labelText;
  }

  set value(value: string) {
    (this.input.element as HTMLInputElement).value = value;
  }

  get value(): string {
    return (this.input.element as HTMLInputElement).value;
  }
}
