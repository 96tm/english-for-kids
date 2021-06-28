import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class GameButton extends Component {
  text: IComponent;

  button: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gameButtonWrap]);
    this.button = new Component(global, this, 'button', [
      Constants.CSSClasses.gameButton,
    ]);
    this.text = new Component(global, this.button, 'span', [
      Constants.CSSClasses.gameButtonText,
    ]);
    this.text.textContent = Constants.Labels.start;
  }
}

export default GameButton;
