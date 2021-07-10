import Component from '../components/Component';
import IComponent from '../components/IComponent';
import GameMenu from '../components/shared/GameMenu';

import Constants from '../util/constants';

export default class GamePage extends Component {
  gameMenu: GameMenu;

  constructor(global: Window, rootView: IComponent | null) {
    super(global, rootView, 'div', [Constants.CSSClasses.container]);
    this.gameMenu = new GameMenu(global, this);
  }

  async init(): Promise<void> {
    await this.gameMenu.init();
  }
}
