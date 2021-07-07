import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import GameHeaderModeButton from './GameHeaderModeButton';
import GameHeaderScore from './GameHeaderScore';
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
  }

  private handleMenuClick: (category: string) => void = (category) => {
    this.heading.textContent = category;
  };

  private handleGameStopped: () => void = () => {
    this.headerScore.element.innerHTML = '';
  };

  private handleRouteChange: (route: string) => void = (route) => {
    if (route !== Constants.Labels.gameRoute) {
      this.heading.textContent = '';
    }
  };
}
