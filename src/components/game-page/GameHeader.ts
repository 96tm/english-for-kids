import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import GameHeaderModeButton from './GameHeaderModeButton';
import GameHeaderScore from './GameHeaderScore';
import Events from '../../util/Events';

class GameHeader extends Component {
  headerScore: IComponent;

  modeButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'header', [Constants.CSSClasses.gameHeader]);
    this.headerScore = new GameHeaderScore(global, this);
    this.modeButton = new GameHeaderModeButton(global, this);
    Events.routeChange.add(this.handleRouteChange.bind(this));
  }

  private handleRouteChange(route: string): void {
    if (route !== Constants.Labels.gameRoute) {
      this.headerScore.element.classList.add(Constants.CSSClasses.hidden);
    } else {
      this.headerScore.element.classList.remove(Constants.CSSClasses.hidden);
    }
  }
}

export default GameHeader;
