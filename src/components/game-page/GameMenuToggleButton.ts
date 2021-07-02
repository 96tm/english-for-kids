import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class GameMenuToggleButton extends Component {
  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.gameMenuToggleButton,
    ]);
    this.append('div', [Constants.CSSClasses.gameMenuToggleBar]);
    // const toggleBar = new Component(global, this, 'div', [
    //   Constants.CSSClasses.gameMenuToggleBar,
    // ]);
  }
}

export default GameMenuToggleButton;
