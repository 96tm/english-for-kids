import Component from '../Component';
import Constants from '../../util/constants';
import IComponent from '../IComponent';

export default class ErrorMessage extends Component {
  buttonRemove: IComponent;

  constructor(global: Window, text: string) {
    super(global, null, 'div', [Constants.CSSClasses.error]);
    this.textContent = text;
    this.buttonRemove = new Component(global, this, 'button', [
      Constants.CSSClasses.buttonRemove,
    ]);
    this.addEventListeners();
  }

  addEventListeners(): void {
    this.buttonRemove.element.addEventListener('click', this.handleClick);
  }

  removeEventListeners(): void {
    this.buttonRemove.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    this.remove();
  };
}
