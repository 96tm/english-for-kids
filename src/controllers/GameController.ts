import Controller from './Controller';
import IComponent from '../components/IComponent';
import GamePage from '../pages/GamePage';
import Events from '../util/Events';
import GameModel from '../models/GameModel';

class GameController extends Controller {
  component: IComponent;

  gameModel: GameModel;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new GamePage(global, rootComponent);
    this.gameModel = new GameModel();
    Events.boardClick.add(this.handleBoardClick.bind(this));
    Events.menuClick.add(this.handleMenuClick.bind(this));
  }

  async init(): Promise<void> {
    await this.gameModel.setCategories();
  }

  private async handleMenuClick(category: string): Promise<void> {
    console.log('menu click', category);
    const cards = await this.gameModel.setActiveCategory(category);
    (this.component as GamePage).addCards(cards);
  }

  private handleBoardClick(word: string) {
    console.log('click', word);

    this.gameModel.playAudio(word);
  }
}

export default GameController;
