import Controller from './Controller';
import IComponent from '../components/IComponent';
import GamePage from '../pages/GamePage';

class GameController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new GamePage(global, rootComponent);
  }
}

export default GameController;
