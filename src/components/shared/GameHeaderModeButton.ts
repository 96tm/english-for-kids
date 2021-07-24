import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import Events from '../../util/Events';

import GameMode from '../../models/GameMode';

export default class GameHeaderModeButton extends Component {
  checkbox: IComponent;
  modeButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSS_CLASSES.gameHeaderModeWrap,
    ]);
    this.checkbox = new Component(
      global,
      this,
      'input',
      [Constants.CSS_CLASSES.gameHeaderModeCheckbox],
      { type: 'checkbox' }
    );
    this.modeButton = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.gameHeaderMode,
      Constants.CSS_CLASSES.gameHeaderModeMixin,
    ]);

    const modeTrain = new Component(global, this.modeButton, 'div', [
      Constants.CSS_CLASSES.gameHeaderModeTrain,
    ]);
    modeTrain.setTextContent(Constants.LABELS.train);

    const modePlay = new Component(global, this.modeButton, 'div', [
      Constants.CSS_CLASSES.gameHeaderModePlay,
    ]);
    modePlay.setTextContent(Constants.LABELS.play);
    this.modeButton.append('div', [Constants.CSS_CLASSES.gameHeaderModeCircle]);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.checkbox.element.addEventListener(
      'change',
      this.handleModeButtonClick
    );
  }

  private removeEventListeners(): void {
    this.checkbox.element.removeEventListener(
      'change',
      this.handleModeButtonClick
    );
  }

  private handleModeButtonClick: () => void = () => {
    const { checked } = this.checkbox.element as HTMLInputElement;
    Events.gameModeChange.emit(checked ? GameMode.play : GameMode.train);
  };
}
