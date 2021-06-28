import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import GameHeaderModeButton from './GameHeaderModeButton';
import GameHeaderScore from './GameHeaderScore';

class GameHeader extends Component {
  headerScore: IComponent;

  modeButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'header', [Constants.CSSClasses.gameHeader]);

    this.headerScore = new GameHeaderScore(global, this);

    this.modeButton = new GameHeaderModeButton(global, this);
  }
}

export default GameHeader;
