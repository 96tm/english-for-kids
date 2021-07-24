import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class GameMenuToggleButton extends Component {
  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSS_CLASSES.gameMenuToggleButton,
    ]);
    this.append('div', [Constants.CSS_CLASSES.gameMenuToggleBar]);
  }
}
