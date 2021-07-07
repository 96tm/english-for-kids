import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Events from '../../util/Events';

export default class GameHeaderScore extends Component {
  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.gameHeaderScoreWrap,
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
    const star = new Component(this.global, this, 'div', [
      Constants.CSSClasses.gameHeaderScoreStar,
      Constants.CSSClasses.checked,
    ]);
  };

  addStarWrong: () => void = () => {
    const star = new Component(this.global, this, 'div', [
      Constants.CSSClasses.gameHeaderScoreStar,
    ]);
  };
}
