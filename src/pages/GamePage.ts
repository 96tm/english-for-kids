import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';

import GameButton from '../components/game-page/GameButton';
import GameBoard from '../components/game-page/GameBoard';

import ICard from '../models/ICard';

import Events from '../util/Events';

export default class GamePage extends Component {
  gameBoard: GameBoard;
  gameButton: GameButton;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.gamePageWrap]);
    this.gameBoard = new GameBoard(global, this);
    this.gameButton = new GameButton(global, this);
    Events.gameStopped.add(this.handleGameStopped);
    Events.boardDisabled.add(this.handleBoardDisabled);
    Events.boardEnabled.add(this.handleBoardEnabled);
  }

  addCards(cards: ICard[]): void {
    this.gameBoard.addCards(cards);
    Events.cardsLoad.emit();
  }

  private handleBoardEnabled: () => void = () => {
    this.gameBoard.cards.forEach((card) => {
      card.enable();
    });
  };

  private handleBoardDisabled: () => void = () => {
    this.gameBoard.cards.forEach((card) => {
      card.disable();
    });
  };

  private handleGameStopped: () => void = () => {
    this.gameButton.setButtonStart();
  };
}
