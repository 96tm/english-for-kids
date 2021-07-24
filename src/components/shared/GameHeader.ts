import Component from '../Component';
import IComponent from '../IComponent';
import GameHeaderModeButton from './GameHeaderModeButton';
import GameHeaderScore from './GameHeaderScore';

import Constants from '../../util/constants';

import Events from '../../util/Events';

export default class GameHeader extends Component {
  headerScore: IComponent;
  modeButton: IComponent;
  heading: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'header', [Constants.CSS_CLASSES.gameHeader]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.gameHeaderHeading,
    ]);
    this.headerScore = new GameHeaderScore(global, this);
    this.modeButton = new GameHeaderModeButton(global, this);
    Events.gameStopped.add(this.handleGameStopped);
    Events.menuClick.add(this.handleMenuClick);
    Events.routeChange.add(this.handleRouteChange);
    Events.statsRepeatDifficult.add(this.handleRepeatDifficult);
  }

  private handleRepeatDifficult: () => void = () => {
    this.heading.textContent = Constants.LABELS.statsRepeatHeading;
  };

  private handleMenuClick: (category: string) => void = (category) => {
    this.heading.textContent = category;
  };

  private handleGameStopped: () => void = () => {
    this.headerScore.element.innerHTML = '';
  };

  private handleRouteChange: (route: string) => void = (route) => {
    if (route === Constants.LABELS.mainRoute) {
      this.heading.textContent = Constants.LABELS.mainPageHeading;
    }
    if (route === Constants.LABELS.statsRoute) {
      this.modeButton.element.classList.add(Constants.CSS_CLASSES.invisible);
      this.heading.textContent = Constants.LABELS.stats;
    } else {
      this.modeButton.element.classList.remove(Constants.CSS_CLASSES.invisible);
    }
  };
}
