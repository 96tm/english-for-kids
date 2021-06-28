import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class GameHeaderModeButton extends Component {
  checkbox: IComponent;

  modeButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.gameHeaderModeWrap,
    ]);
    this.checkbox = new Component(
      global,
      this,
      'input',
      [Constants.CSSClasses.gameHeaderModeCheckbox],
      { type: 'checkbox' }
    );
    this.modeButton = new Component(global, this, 'div', [
      Constants.CSSClasses.gameHeaderMode,
      Constants.CSSClasses.gameHeaderModeMixin,
    ]);

    const modeTrain = new Component(global, this.modeButton, 'div', [
      Constants.CSSClasses.gameHeaderModeTrain,
    ]);
    modeTrain.textContent = Constants.Labels.train;

    const modePlay = new Component(global, this.modeButton, 'div', [
      Constants.CSSClasses.gameHeaderModePlay,
    ]);
    modePlay.textContent = Constants.Labels.play;

    this.modeButton.append('div', [Constants.CSSClasses.gameHeaderModeCircle]);
  }
}

export default GameHeaderModeButton;
