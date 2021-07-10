import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';

import GameButton from '../components/game-page/GameButton';
import GameBoard from '../components/game-page/GameBoard';
import Card from '../components/game-page/Card';

import ICard from '../models/ICard';

import Events from '../util/Events';

export default class GamePage extends Component {
  gameBoard: IComponent;
  gameButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gamePageWrap]);
    this.gameBoard = new GameBoard(global, this);
    this.gameButton = new GameButton(global, this);
    Events.gameStopped.add(this.handleGameStopped);
    Events.boardDisabled.add(this.handleBoardDisabled);
    Events.boardEnabled.add(this.handleBoardEnabled);
  }

  addCards(cards: ICard[]): void {
    (this.gameBoard as GameBoard).addCards(cards);
    Events.cardsLoad.emit();
  }

  private handleBoardEnabled: () => void = () => {
    (this.gameBoard as GameBoard).cards.forEach((card) => {
      (card as Card).enable();
    });
  };

  private handleBoardDisabled: () => void = () => {
    (this.gameBoard as GameBoard).cards.forEach((card) => {
      (card as Card).disable();
    });
  };

  private handleGameStopped: () => void = () => {
    (this.gameButton as GameButton).setButtonStart();
  };
}
