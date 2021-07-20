import BoardModel from './BoardModel';
import GameMode from './GameMode';
import CardModel from './CardModel';
import ICard from './ICard';
import GameStatus from './GameStatus';
import ICategoryDTO from './ICategoryDTO';

import Events from '../util/Events';
import Constants from '../util/constants';

import winAudio from '../assets/sounds/win.mp3';
import loseAudio from '../assets/sounds/lose.mp3';
import correctAudio from '../assets/sounds/correct.mp3';
import wrongAudio from '../assets/sounds/wrong.mp3';

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
    this.playAudio(correctAudio);
  }

  async playWrong(): Promise<void> {
    this.playAudio(wrongAudio);
  }

  async playWin(): Promise<void> {
    const audio = this.global.document.createElement('audio');
    await this.playAudio(winAudio, audio);
    audio.remove();
  }

  async playLose(): Promise<void> {
    const audio = this.global.document.createElement('audio');
    this.playAudio(loseAudio, audio);
    audio.remove();
  }

  async setActiveCategory(
    category: string,
    responsePromise: Promise<Response>
  ): Promise<ICard[]> {
    this.activeCategory = category;
    return this.boardModel.loadCards(category, responsePromise);
  }

  loadDifficult(cards: ICard[]): void {
    this.boardModel.cards = cards;
  }

  setCategories(categories: ICategoryDTO[]): string[] {
    categories.forEach((category) => {
      this.categories.push(category.name);
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
    return Constants.Labels.winMessage;
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
