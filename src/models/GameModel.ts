import BoardModel from './BoardModel';
import GameMode from './GameMode';
import CardModel from './CardModel';
import ICard from './ICard';
import GameStatus from './GameStatus';

import Events from '../util/Events';

import Constants from '../util/constants';
import Api from '../util/Api';

export default class GameModel {
  static START_DELAY = 1000;
  private audio: HTMLAudioElement;
  _mode: GameMode = GameMode.train;
  boardModel: BoardModel;
  status: GameStatus = GameStatus.inactive;
  categories: string[] = [];
  activeCategory = '';
  currentCard?: ICard;
  currentIndex = 0;
  numberOfRightGuesses = 0;
  numberOfGuesses = 0;

  constructor(private global: Window) {
    this.boardModel = new BoardModel();
    this.audio = this.global.document.createElement('audio');
  }

  async playAudio(
    src: string,
    audio: HTMLAudioElement = this.audio
  ): Promise<void> {
    audio.setAttribute('src', src);
    audio.setAttribute('currentTime', '0');
    return new Promise((resolve) => {
      audio.addEventListener('ended', () => resolve(), { once: true });
      audio.play();
    });
  }

  async playCorrect(): Promise<void> {
    this.playAudio(`${Constants.HOMEPAGE}/public/audio/correct.mp3`);
  }

  async playWrong(): Promise<void> {
    this.playAudio(`${Constants.HOMEPAGE}/public/audio/wrong.mp3`);
  }

  async playWin(): Promise<void> {
    const audio = this.global.document.createElement('audio');
    await this.playAudio(`${Constants.HOMEPAGE}/public/audio/win.mp3`, audio);
    audio.remove();
  }

  async playLose(): Promise<void> {
    const audio = this.global.document.createElement('audio');
    this.playAudio(`${Constants.HOMEPAGE}/public/audio/lose.mp3`, audio);
    audio.remove();
  }

  async setActiveCategory(category: string): Promise<ICard[]> {
    this.activeCategory = category;
    return this.boardModel.loadCards(category);
  }

  loadDifficult(cards: ICard[]): void {
    this.boardModel.cards = cards;
  }

  async setCategories(): Promise<string[]> {
    const categories = await Api.getCategories().then((response) =>
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
      return `${numberOfWrongGuesses} error${
        numberOfWrongGuesses === 1 ? '' : 's'
      }`;
    }
    return Constants.LABELS.winMessage;
  }

  get isFinished(): boolean {
    return this.numberOfRightGuesses === this.boardModel.cards.length;
  }

  async playCardAudio(word: string): Promise<void> {
    return (this.boardModel.getCard(word) as CardModel).playCardAudio();
  }

  async playCardAudioByIndex(index: number): Promise<void> {
    return (this.boardModel.cards[index] as CardModel).playCardAudio();
  }

  async playNextWord(): Promise<void> {
    if (this.currentIndex < this.boardModel.cards.length - 1) {
      this.currentIndex += 1;
      const promise = this.playCardAudioByIndex(this.currentIndex);
      return promise;
    }
    return Promise.resolve();
  }

  async start(): Promise<void> {
    this.status = GameStatus.active;
    this.boardModel.shuffleCards();
    await new Promise((res) => setTimeout(res, GameModel.START_DELAY));
    return this.playCardAudioByIndex(0);
  }

  stop(): void {
    this.status = GameStatus.inactive;
    this.currentIndex = 0;
    this.numberOfGuesses = 0;
    this.numberOfRightGuesses = 0;
    Events.gameStopped.emit();
  }

  async repeat(): Promise<void> {
    return this.playCardAudioByIndex(this.currentIndex);
  }
}
