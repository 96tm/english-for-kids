import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class FileInput extends Component {
  input: IComponent;
  label: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    inputId: string,
    labelText: string,
    accept: string,
    value = ''
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCardFileInputWrap,
    ]);
    this.label = new Component(
      global,
      this,
      'label',
      [Constants.CSSClasses.adminCardFileInputLabel],
      { for: inputId }
    );
    this.label.textContent = labelText;
    this.input = new Component(
      global,
      this,
      'input',
      [Constants.CSSClasses.adminCardFileInput],
      {
        type: 'file',
        id: inputId,
        value,
        accept,
      }
    );
  }

  get value(): File | undefined {
    const { files } = this.input.element as HTMLInputElement;
    if (files && files.length) {
      return files[0];
    }
    return undefined;
  }
}
