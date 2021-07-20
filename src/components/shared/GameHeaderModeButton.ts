import Component from '../Component';
import IComponent from '../IComponent';

import GameMode from '../../models/GameMode';

import Constants from '../../util/constants';
import Events from '../../util/Events';

export default class GameHeaderModeButton extends Component {
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
