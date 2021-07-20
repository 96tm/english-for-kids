import IComponent from '../IComponent';
import Component from '../Component';

import IInputValidationResult from './IInputValidationResult';
import BaseValidatedInput from './BaseInput';

import Constants from '../../util/constants';

export default class FileInput extends BaseValidatedInput {
  input: IComponent;
  label: IComponent;
  wrapLabel: IComponent;
  fileName: IComponent;
  fileSize: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    inputId: string,
    labelText: string,
    accept: string,
    public validatingFunctions: Array<() => IInputValidationResult> = [],
    value = ''
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCardFileInputWrap,
    ]);
    const inputWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCardFileInputInnerWrap,
    ]);
    this.wrapLabel = new Component(
      global,
      inputWrap,
      'label',
      [Constants.CSSClasses.adminCardFileInputWrapLabel],
      { for: inputId }
    );
    this.wrapLabel.textContent = labelText;
    this.input = new Component(
      global,
      inputWrap,
      'input',
      [Constants.CSSClasses.adminCardFileInput],
      {
        type: 'file',
        id: inputId,
        value,
        accept,
      }
    );

    this.label = new Component(
      global,
      inputWrap,
      'label',
      [Constants.CSSClasses.adminCardFileInputLabel],
      { for: inputId }
    );
    this.label.textContent = Constants.Labels.selectFile;
    this.fileName = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCardFileInputName,
    ]);
    this.fileSize = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCardFileInputSize,
    ]);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.input.element.addEventListener('change', this.handleInputChange);
  }

  private removeEventListeners(): void {
    this.input.element.removeEventListener('change', this.handleInputChange);
  }

  private handleInputChange: (event: Event) => void = (event) => {
    const { files } = this.input.element as HTMLInputElement;
    if (files?.length) {
      const file = files[0];
      this.fileName.textContent = file.name;
      this.fileName.element.setAttribute('title', file.name);
      const size = file.size / 1000;
      this.fileSize.textContent = `${size.toFixed(2)}Kb`;
      this.fileSize.element.setAttribute('title', `${size.toFixed(2)}Kb`);
    }
  };

  get value(): File | undefined {
    const { files } = this.input.element as HTMLInputElement;
    if (files && files.length) {
      return files[0];
    }
    return undefined;
  }
}
