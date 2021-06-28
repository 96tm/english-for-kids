import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import GameHeader from './GameHeader';
import GamePageMain from './GamePageMain';
import GameFooter from './GameFooter';
import GameButton from './GameButton';

class GamePageWrap extends Component {
  gameHeader: IComponent;

  gamePageMain: IComponent;

  gameFooter: IComponent;

  gameButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gamePageWrap]);
    this.gameHeader = new GameHeader(global, this);
    this.gamePageMain = new GamePageMain(global, this);
    this.gameFooter = new GameFooter(global, this);
    this.gameButton = new GameButton(global, this);
  }
}

export default GamePageWrap;
