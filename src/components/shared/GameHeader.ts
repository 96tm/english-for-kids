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
    super(global, rootComponent, 'header', [Constants.CSSClasses.gameHeader]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.gameHeaderHeading,
    ]);
    this.headerScore = new GameHeaderScore(global, this);
    this.modeButton = new GameHeaderModeButton(global, this);
    Events.gameStopped.add(this.handleGameStopped);
    Events.menuClick.add(this.handleMenuClick);
    Events.routeChange.add(this.handleRouteChange);
    Events.statsRepeatDifficult.add(this.handleRepeatDifficult);
  }

  private handleRepeatDifficult: () => void = () => {
    this.heading.textContent = Constants.Labels.statsRepeatHeading;
  };

  private handleMenuClick: (category: string) => void = (category) => {
    this.heading.textContent = category;
  };

  private handleGameStopped: () => void = () => {
    this.headerScore.element.innerHTML = '';
  };

  private handleRouteChange: (route: string) => void = (route) => {
    if (route === Constants.Labels.mainRoute) {
      this.heading.textContent = Constants.Labels.mainPageHeading;
    }
    if (route === Constants.Labels.statsRoute) {
      this.modeButton.element.classList.add(Constants.CSSClasses.invisible);
      this.heading.textContent = Constants.Labels.stats;
    } else {
      this.modeButton.element.classList.remove(Constants.CSSClasses.invisible);
    }
  };
}
