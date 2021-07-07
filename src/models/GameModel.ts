import BoardModel from './BoardModel';
import GameMode from './GameMode';
import CardModel from './CardModel';
import ICard from './ICard';
import GameStatus from './GameStatus';
import Events from '../util/Events';
import Constants from '../util/constants';

export default class GameModel {
  static START_DELAY = 1000;

  boardModel: BoardModel;

  _mode: GameMode = GameMode.train;

  status: GameStatus = GameStatus.inactive;

  categories: string[] = [];

  activeCategory = '';

  currentCard?: ICard;

  currentIndex = 0;

  numberOfRightGuesses = 0;

  numberOfGuesses = 0;

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

  set mode(value: GameMode) {
    this._mode = value;
  }

  get mode(): GameMode {
    return this._mode;
  }

  getCurrentCard(): ICard {
    return this.boardModel.cards[this.currentIndex];
  }

  createFinishMessage(): string {
    const numberOfWrongGuesses =
      this.numberOfGuesses - this.numberOfRightGuesses;
    if (numberOfWrongGuesses) {
      return `${numberOfWrongGuesses} errors`;
    }
    return Constants.Labels.winMessage;
  }

  async playAudio(word: string): Promise<void> {
    return (this.boardModel.getCard(word) as CardModel).playAudio();
  }

  async playAudioByIndex(index: number): Promise<void> {
    return (this.boardModel.cards[index] as CardModel).playAudio();
  }

  async playNextWord(): Promise<void> {
    if (this.currentIndex < this.boardModel.cards.length - 1) {
      this.currentIndex += 1;
      const promise = this.playAudioByIndex(this.currentIndex);
      return promise;
    }
    Events.gameFinished.emit();
    return Promise.resolve();
  }

  async start(): Promise<void> {
    this.status = GameStatus.active;
    this.boardModel.shuffleCards();
    await new Promise((res) => setTimeout(res, GameModel.START_DELAY));
    return this.playAudioByIndex(0);
  }

  stop(): void {
    this.status = GameStatus.inactive;
    this.currentIndex = 0;
    this.numberOfGuesses = 0;
    this.numberOfRightGuesses = 0;
  }

  async repeat(): Promise<void> {
    return this.playAudioByIndex(this.currentIndex);
  }
}
