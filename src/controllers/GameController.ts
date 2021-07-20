import Controller from './Controller';

import IComponent from '../components/IComponent';
import GameBoard from '../components/game-page/GameBoard';
import Card from '../components/game-page/Card';
import GameButton from '../components/game-page/GameButton';

import GamePage from '../pages/GamePage';

import ICard from '../models/ICard';
import GameModel from '../models/GameModel';
import GameMode from '../models/GameMode';
import GameStatus from '../models/GameStatus';

import Api from '../util/Api';
import Events from '../util/Events';
import Constants from '../util/constants';
import RouterService from '../util/RouterService';

export default class GameController extends Controller {
  component: IComponent;
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
    let categories = [];
    try {
      categories = await Api.getAllCategories().then((response) =>
        response.json()
      );
    } catch (err) {
      Events.gameErrorShow.emit(Constants.Labels.connectionProblem);
    }
    this.gameModel.setCategories(categories);
  }

  private handleRouteChange: () => Promise<void> = async () => {
    this.gameModel.stop();
  };

  private handleGameStopped: () => Promise<void> = async () => {
    this.setCardComponents(this.gameModel.mode);
  };

  private handleRepeatDifficult: (cards: ICard[]) => Promise<void> = async (
    cards
  ) => {
    (this.component as GamePage).addCards(cards);
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
    RouterService.setHash(Constants.Labels.mainRoute);
    Events.menuClick.emit(Constants.Labels.mainMenu);
  };

  private handleMenuClick: (category: string) => Promise<void> = async (
    category
  ) => {
    const responsePromise = Api.getAllWordsByCategory(category);
    const cards = await this.gameModel.setActiveCategory(
      category,
      responsePromise
    );
    (this.component as GamePage).addCards(cards);
  };

  private handleCardClick: (word: string) => Promise<void> = async (word) => {
    const wordInfo = this.gameModel.boardModel.getCard(word);
    if (this.gameModel.mode === GameMode.train) {
      Events.statsTrainingClick.emit({
        ...wordInfo,
      });
      await this.gameModel.playCardAudio(word);
    } else if (this.gameModel.status === GameStatus.active) {
      this.gameModel.numberOfGuesses += 1;
      const currentWordInfo = (this.gameModel as GameModel).getCurrentCard();
      if (this.checkWord(word)) {
        ((this.component as GamePage).gameBoard as GameBoard)
          .getCard(word)
          .markAsRight();
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
    ((this.component as GamePage).gameButton as GameButton).disable();
    if (this.gameModel.status === GameStatus.inactive) {
      await this.gameModel.start();
      ((this.component as GamePage).gameButton as GameButton).enable();
    } else {
      await this.gameModel.repeat();
      ((this.component as GamePage).gameButton as GameButton).enable();
    }
  };

  private handleGameModeChange: (mode: GameMode) => Promise<void> = async (
    mode
  ) => {
    this.gameModel.mode = mode;
    this.setCardComponents(mode);
    if (this.gameModel.mode === GameMode.train) {
      this.gameModel.stop();
    }
  };

  private handleCardsLoad: () => Promise<void> = async () => {
    const { mode } = this.gameModel;
    this.setCardComponents(mode);
  };

  private setCardComponents: (mode: GameMode) => void = (mode) => {
    const gamePage = this.component as GamePage;
    const board = gamePage.gameBoard as GameBoard;
    if (mode === GameMode.play) {
      if (board.cards.length) {
        (gamePage.gameButton as GameButton).show();
      }
      (gamePage.gameButton as GameButton).setButtonStart();
      (board.cards as Card[]).forEach((card) => {
        card.setPlayMode();
      });
    } else {
      (gamePage.gameButton as GameButton).hide();
      (gamePage.gameButton as GameButton).setButtonRepeat();
      (board.cards as Card[]).forEach((card) => {
        card.setTrainMode();
      });
    }
  };
}
