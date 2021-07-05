import BoardModel from './BoardModel';
import GameMode from './GameMode';
import CardModel from './CardModel';
import ICard from './ICard';

export default class GameModel {
  boardModel: BoardModel;

  mode: GameMode = GameMode.train;

  categories: string[] = [];

  activeCategory = '';

  constructor() {
    this.boardModel = new BoardModel();
  }

  async setActiveCategory(category: string): Promise<ICard[]> {
    this.activeCategory = category;
    return this.boardModel.loadCards(category);
  }

  async setCategories(): Promise<string[]> {
    const categories = await fetch('../../cards.json').then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((category) => {
      this.categories.push(category);
    });
    return this.categories;
  }

  setTrainMode(): void {
    this.mode = GameMode.train;
  }

  setPlayMode(): void {
    this.mode = GameMode.play;
  }

  playAudio(word: string): void {
    (this.boardModel.getCard(word) as CardModel).playAudio();
  }
}
