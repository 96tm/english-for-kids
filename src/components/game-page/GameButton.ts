import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Events from '../../util/Events';

export default class GameButton extends Component {
  text: IComponent;

  button: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.gameButtonWrap,
      Constants.CSSClasses.hidden,
    ]);
    this.button = new Component(global, this, 'button', [
      Constants.CSSClasses.gameButton,
    ]);
    this.text = new Component(global, this.button, 'span', [
      Constants.CSSClasses.gameButtonText,
    ]);
    this.text.textContent = Constants.Labels.start;
    this.addEventListeners();
  }

  setButtonStart(): void {
    (this.button as GameButton).element.classList.remove(
      Constants.CSSClasses.gameButtonRepeat
    );
  }

  setButtonRepeat(): void {
    (this.button as GameButton).element.classList.add(
      Constants.CSSClasses.gameButtonRepeat
    );
  }

  addEventListeners(): void {
    this.button.element.addEventListener('click', this.handleClick);
  }

  removeEventListeners(): void {
    this.button.element.removeEventListener('click', this.handleClick);
  }

  disable: () => void = () => {
    this.button.element.classList.add(Constants.CSSClasses.noClicks);
  };

  enable: () => void = () => {
    this.button.element.classList.remove(Constants.CSSClasses.noClicks);
  };

  hide: () => void = () => {
    this.element.classList.add(Constants.CSSClasses.hidden);
  };

  show: () => void = () => {
    this.element.classList.remove(Constants.CSSClasses.hidden);
  };

  private handleClick: () => void = () => {
    this.setButtonRepeat();
    this.disable();
    Events.gameButtonClick.emit();
  };
}
