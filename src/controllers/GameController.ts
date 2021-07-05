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
    Events.boardClick.add(this.handleCardClick);
    Events.menuClick.add(this.handleMenuClick);
    Events.cardClick.add(this.handleCardClick);
  }

  async init(): Promise<void> {
    await this.gameModel.setCategories();
  }

  private handleMenuClick: (category: string) => Promise<void> = async (
    category
  ) => {
    const cards = await this.gameModel.setActiveCategory(category);
    (this.component as GamePage).addCards(cards);
  };

  private handleCardClick: (word: string) => void = async (word) => {
    await this.gameModel.playAudio(word);
  };
}

export default GameController;
