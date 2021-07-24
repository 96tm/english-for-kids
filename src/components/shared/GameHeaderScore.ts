import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import Events from '../../util/Events';

export default class GameHeaderScore extends Component {
  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSS_CLASSES.gameHeaderScoreWrap,
    ]);
    Events.cardGuess.add(this.handleCardGuess);
  }

  private handleCardGuess: (isRight: boolean) => void = (isRight) => {
    if (isRight) {
      this.addStarRight();
    } else {
      this.addStarWrong();
    }
  };

  addStarRight: () => void = () => {
    this.append('div', [
      Constants.CSS_CLASSES.gameHeaderScoreStar,
      Constants.CSS_CLASSES.checked,
    ]);
  };

  addStarWrong: () => void = () => {
    this.append('div', [Constants.CSS_CLASSES.gameHeaderScoreStar]);
  };
}
