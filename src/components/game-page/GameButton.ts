import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import Events from '../../util/Events';

export default class GameButton extends Component {
  text: IComponent;
  button: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSS_CLASSES.gameButtonWrap,
      Constants.CSS_CLASSES.hidden,
    ]);
    this.button = new Component(global, this, 'button', [
      Constants.CSS_CLASSES.gameButton,
    ]);
    this.text = new Component(global, this.button, 'span', [
      Constants.CSS_CLASSES.gameButtonText,
    ]);
    this.text.setTextContent(Constants.LABELS.start);
    this.addEventListeners();
  }

  setButtonStart(): void {
    (this.button as GameButton).element.classList.remove(
      Constants.CSS_CLASSES.gameButtonRepeat
    );
  }

  setButtonRepeat(): void {
    (this.button as GameButton).element.classList.add(
      Constants.CSS_CLASSES.gameButtonRepeat
    );
  }

  addEventListeners(): void {
    this.button.element.addEventListener('click', this.handleClick);
  }

  removeEventListeners(): void {
    this.button.element.removeEventListener('click', this.handleClick);
  }

  disable: () => void = () => {
    this.button.element.classList.add(Constants.CSS_CLASSES.noClicks);
  };

  enable: () => void = () => {
    this.button.element.classList.remove(Constants.CSS_CLASSES.noClicks);
  };

  hide: () => void = () => {
    this.element.classList.add(Constants.CSS_CLASSES.hidden);
  };

  show: () => void = () => {
    this.element.classList.remove(Constants.CSS_CLASSES.hidden);
  };

  private handleClick: () => void = () => {
    this.setButtonRepeat();
    this.disable();
    Events.gameButtonClick.emit();
  };
}
