import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Constants from '../util/constants';
import GameMenuToggleButton from '../components/game-page/GameMenuToggleButton';
import GameMenu from '../components/game-page/GameMenu';
import GamePageWrap from '../components/game-page/GamePageWrap';

export default class GamePage extends Component {
  gameToggleCheckbox: IComponent;

  gameToggleButton: IComponent;

  gameMenu: GameMenu;

  gamePageWrap: GamePageWrap;

  constructor(global: Window, rootView: IComponent | null) {
    super(global, rootView, 'div', [Constants.CSSClasses.container]);

    this.gameToggleCheckbox = new Component(
      global,
      this,
      'input',
      [Constants.CSSClasses.gameMenuToggleCheckbox],
      { type: 'checkbox' }
    );

    this.gameToggleButton = new GameMenuToggleButton(global, this);

    this.gameMenu = new GameMenu(global, this);

    this.gamePageWrap = new GamePageWrap(global, this);
  }
}
