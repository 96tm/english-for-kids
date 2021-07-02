import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class GameHeaderScore extends Component {
  starRight: IComponent;

  starWrong: Component;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.gameHeaderScoreWrap,
    ]);
    this.starRight = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.gameHeaderScoreStar, Constants.CSSClasses.checked],
      { 'data-number-of-tries': '0' }
    );
    this.starWrong = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.gameHeaderScoreStar],
      { 'data-number-of-tries': '0' }
    );
  }
}

export default GameHeaderScore;
