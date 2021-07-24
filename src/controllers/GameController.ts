import Controller from './Controller';

import IComponent from '../components/IComponent';
import GamePage from '../pages/GamePage';

import Events from '../util/Events';

import GameModel from '../models/GameModel';
import GameMode from '../models/GameMode';
import GameStatus from '../models/GameStatus';
import ICard from '../models/ICard';

import Constants from '../util/constants';

import RouterService from '../util/RouterService';

export default class GameController extends Controller {
  component: GamePage;
  gameModel: GameModel;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new GamePage(global, rootComponent);
    this.gameModel = new GameModel(global);
    Events.menuClick.add(this.handleMenuClick);
    Events.cardClick.add(this.handleCardClick);
    Events.gameModeChange.add(this.handleGameModeChange);
    Events.gameButtonClick.add(this.handleGameButtonClick);
    Events.cardsLoad.add(this.handleCardsLoad);
    Events.gameFinished.add(this.handleGameFinished);
    Events.gameStopped.add(this.handleGameStopped);
    Events.routeChange.add(this.handleRouteChange);
    Events.statsRepeatDifficult.add(this.handleRepeatDifficult);
  }

  async init(): Promise<void> {
    await this.gameModel.setCategories();
  }

  private handleRouteChange: () => void = () => {
    this.gameModel.stop();
  };

  private handleGameStopped: () => void = () => {
    this.setCardComponents(this.gameModel.mode);
  };

  private handleRepeatDifficult: (cards: ICard[]) => void = async (cards) => {
    this.component.addCards(cards);
    this.gameModel.loadDifficult(cards);
  };

  private handleGameFinished: () => Promise<void> = async () => {
    const numberOfWrongGuesses =
      this.gameModel.numberOfGuesses - this.gameModel.numberOfRightGuesses;
    Events.finishScreenShow.emit({
      message: this.gameModel.createFinishMessage(),
      isWin: numberOfWrongGuesses === 0,
    });
    if (numberOfWrongGuesses) {
      await this.gameModel.playLose();
    } else {
      await this.gameModel.playWin();
    }
    this.gameModel.stop();
    RouterService.setHash(Constants.LABELS.mainRoute);
    Events.menuClick.emit(Constants.LABELS.mainMenu);
  };

  private handleMenuClick: (category: string) => Promise<void> = async (
    category
  ) => {
    const cards = await this.gameModel.setActiveCategory(category);
    this.component.addCards(cards);
  };

  private handleCardClick: (word: string) => void = async (word) => {
    const wordInfo = this.gameModel.boardModel.getCard(word);
    if (this.gameModel.mode === GameMode.train) {
      Events.statsTrainingClick.emit({
        ...wordInfo,
      });
      await this.gameModel.playCardAudio(word);
    } else if (this.gameModel.status === GameStatus.active) {
      this.gameModel.numberOfGuesses += 1;
      const currentWordInfo = this.gameModel.getCurrentCard();
      if (this.checkWord(word)) {
        this.component.gameBoard.getCard(word).markAsRight();
        Events.statsRightClick.emit({
          ...currentWordInfo,
        });
        this.gameModel.numberOfRightGuesses += 1;
        await this.gameModel.playCorrect();
        Events.cardGuess.emit(true);
        if (this.gameModel.isFinished) {
          Events.gameFinished.emit();
        } else {
          await this.gameModel.playNextWord();
        }
      } else {
        Events.statsWrongClick.emit({
          ...currentWordInfo,
        });
        await this.gameModel.playWrong();
        Events.cardGuess.emit(false);
      }
    }
    Events.boardEnabled.emit();
  };

  private checkWord(word: string): boolean {
    const card = this.gameModel.boardModel.getCard(word);
    if (card === this.gameModel.getCurrentCard()) {
      return true;
    }
    return false;
  }

  private handleGameButtonClick: () => Promise<void> = async () => {
    this.component.gameButton.disable();
    if (this.gameModel.status === GameStatus.inactive) {
      await this.gameModel.start();
      this.component.gameButton.enable();
    } else {
      await this.gameModel.repeat();
      this.component.gameButton.enable();
    }
  };

  private handleGameModeChange: (mode: GameMode) => void = (mode) => {
    this.gameModel.mode = mode;
    this.setCardComponents(mode);
    if (this.gameModel.mode === GameMode.train) {
      this.gameModel.stop();
    }
  };

  private handleCardsLoad: () => void = () => {
    const { mode } = this.gameModel;
    this.setCardComponents(mode);
  };

  private setCardComponents: (mode: GameMode) => void = (mode) => {
    const board = this.component.gameBoard;
    if (mode === GameMode.play) {
      if (board.cards.length) {
        this.component.gameButton.show();
      }
      this.component.gameButton.setButtonStart();
      board.cards.forEach((card) => {
        card.setPlayMode();
      });
    } else {
      this.component.gameButton.hide();
      this.component.gameButton.setButtonRepeat();
      board.cards.forEach((card) => {
        card.setTrainMode();
      });
    }
  };
}
