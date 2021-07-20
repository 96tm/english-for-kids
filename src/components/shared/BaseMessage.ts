import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default abstract class BaseMessage extends Component {
  static OPACITY_REDUCTION_INTERVAL = 400;
  static OPACITY_REDUCTION_VALUE = 0.1;
  static MESSAGE_REMOVAL_TIMEOUT = 4000;
  buttonRemove: IComponent;
  intervalHandle: null | NodeJS.Timeout;

  constructor(global: Window, classes: string[], text: string) {
    super(global, null, 'div', classes);
    this.textContent = text;
    this.buttonRemove = new Component(global, this, 'button', [
      Constants.CSSClasses.buttonRemove,
    ]);
    this.addEventListeners();
    this.intervalHandle = setInterval(
      this.reduceOpacity,
      BaseMessage.OPACITY_REDUCTION_INTERVAL
    );
    setTimeout(() => {
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
      this.remove();
    }, BaseMessage.MESSAGE_REMOVAL_TIMEOUT);
  }

  private reduceOpacity: () => void = () => {
    this.element.style.opacity = String(
      (Number(this.element.style.opacity) || 1) -
        BaseMessage.OPACITY_REDUCTION_VALUE
    );
  };

  addEventListeners(): void {
    this.buttonRemove.element.addEventListener('click', this.handleClick);
  }

  removeEventListeners(): void {
    this.buttonRemove.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
    this.remove();
  };
}
