import IComponent from '../components/IComponent';
import Component from '../components/Component';
import GameMenu from '../components/shared/GameMenu';

import ICategoryDTO from '../models/ICategoryDTO';

import Constants from '../util/constants';

export default class GamePage extends Component {
  gameMenu: GameMenu;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.container]);
    this.gameMenu = new GameMenu(global, this);
  }

  async init(categories: ICategoryDTO[]): Promise<void> {
    await this.gameMenu.init(categories);
  }
}
