import Component from '../Component';
import Constants from '../../util/constants';
import IComponent from '../IComponent';

export default abstract class BaseMessage extends Component {
  buttonRemove: IComponent;

  constructor(global: Window, classes: string[], text: string) {
    super(global, null, 'div', classes);
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
