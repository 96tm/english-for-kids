import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import GameBoard from './GameBoard';

class GamePageMain extends Component {
  board: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gamePageMain]);
    this.board = new GameBoard(global, this);
  }
}

export default GamePageMain;
