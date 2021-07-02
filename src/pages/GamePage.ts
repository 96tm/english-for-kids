import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Constants from '../util/constants';
import GameButton from '../components/game-page/GameButton';
import GameBoard from '../components/game-page/GameBoard';

class GamePage extends Component {
  gameBoard: IComponent;

  gameButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gamePageWrap]);
    this.gameBoard = new GameBoard(global, this);
    this.gameButton = new GameButton(global, this);
  }
}

export default GamePage;
