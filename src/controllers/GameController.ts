import Controller from './Controller';
import IComponent from '../components/IComponent';
import GamePage from '../pages/GamePage';
import Events from '../util/Events';
import GameModel from '../models/GameModel';
import GameMode from '../models/GameMode';
import GameBoard from '../components/game-page/GameBoard';
import Card from '../components/game-page/Card';
import GameButton from '../components/game-page/GameButton';
import Constants from '../util/constants';
import GameStatus from '../models/GameStatus';

export default class GameController extends Controller {
  component: IComponent;

  gameModel: GameModel;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new GamePage(global, rootComponent);
    this.gameModel = new GameModel();
    Events.boardClick.add(this.handleCardClick);
    Events.menuClick.add(this.handleMenuClick);
    Events.cardClick.add(this.handleCardClick);
    Events.gameModeChange.add(this.handleGameModeChange);
    Events.gameButtonClick.add(this.handleGameButtonClick);
    Events.cardsLoad.add(this.handleCardsLoad);
    Events.gameFinished.add(this.handleGameFinished);
  }

  async init(): Promise<void> {
    await this.gameModel.setCategories();
  }

  private handleGameFinished: () => Promise<void> = async () => {
    Events.finishScreenShow.emit({
      message: this.gameModel.createFinishMessage(),
      isWin:
        this.gameModel.numberOfGuesses - this.gameModel.numberOfRightGuesses ===
        0,
    });
    this.gameModel.stop();
  };

  private handleMenuClick: (category: string) => Promise<void> = async (
    category
  ) => {
    const cards = await this.gameModel.setActiveCategory(category);
    (this.component as GamePage).addCards(cards);
  };

  private handleCardClick: (word: string) => void = async (word) => {
    if (this.gameModel.mode === GameMode.train) {
      await this.gameModel.playAudio(word);
    } else if (this.gameModel.status === GameStatus.active) {
      if (this.checkWord(word)) {
        ((this.component as GamePage).gameBoard as GameBoard)
          .getCard(word)
          .markAsRight();
        this.gameModel.numberOfRightGuesses += 1;
        Events.cardGuess.emit(true);
        this.gameModel.playNextWord();
      } else {
        Events.cardGuess.emit(false);
      }
      this.gameModel.numberOfGuesses += 1;
    }
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

  private handleGameModeChange: (mode: GameMode) => void = (mode) => {
    this.gameModel.mode = mode;
    this.setCardComponents(mode);
  };

  private handleCardsLoad: () => void = () => {
    const { mode } = this.gameModel;
    this.setCardComponents(mode);
  };

  private setCardComponents: (mode: GameMode) => void = (mode) => {
    const gamePage = this.component as GamePage;
    const board = gamePage.gameBoard as GameBoard;
    if (mode === GameMode.play) {
      gamePage.gameButton.element.classList.remove(Constants.CSSClasses.hidden);
      (gamePage.gameButton as GameButton).setButtonStart();
      (board.cards as Card[]).forEach((card) => {
        card.setPlayMode();
      });
    } else {
      gamePage.gameButton.element.classList.add(Constants.CSSClasses.hidden);
      (gamePage.gameButton as GameButton).setButtonRepeat();
      (board.cards as Card[]).forEach((card) => {
        card.setTrainMode();
      });
    }
  };
}
