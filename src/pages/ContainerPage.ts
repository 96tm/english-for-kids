import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Constants from '../util/constants';
import GameMenuToggleButton from '../components/shared/GameMenuToggleButton';
import GameMenu from '../components/shared/GameMenu';
import GameHeader from '../components/game-page/GameHeader';
import GameFooter from '../components/game-page/GameFooter';

export default class ContainerPage extends Component {
  gameToggleCheckbox: IComponent;

  gameToggleButton: IComponent;

  gameMenu: GameMenu;

  gameHeader: IComponent;

  contentWrap: IComponent;

  footer: IComponent;

  innerContainer: IComponent;

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
    this.innerContainer = new Component(global, this, 'div', [
      Constants.CSSClasses.innerContainer,
    ]);
    this.gameHeader = new GameHeader(global, this.innerContainer);
    this.contentWrap = new Component(global, this.innerContainer, 'div', [
      Constants.CSSClasses.contentWrap,
    ]);
    this.footer = new GameFooter(global, this.innerContainer);
  }

  async init(): Promise<void> {
    await this.gameMenu.init();
  }
}
