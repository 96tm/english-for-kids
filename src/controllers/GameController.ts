import Controller from './Controller';
import IComponent from '../components/IComponent';
import GamePage from '../pages/GamePage';

class GameController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new GamePage(global, rootComponent);
  }

  async init() {
    await (this.component as GamePage).init();
  }
}

export default GameController;
