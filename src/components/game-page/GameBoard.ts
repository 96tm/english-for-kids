import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Card from './Card';
import Events from '../../util/Events';
import ICard from '../../models/ICard';

class GameBoard extends Component {
  cards: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gameBoard]);
  }

  getCard(word: string): Card {
    return this.cards.find((card) => (card as Card).word === word) as Card;
  }

  addCards(cardModels: ICard[]): void {
    this.cards = [];
    this.element.innerHTML = '';
    cardModels.forEach((cardModel) => {
      this.addOneCard(cardModel);
    });
  }

  addOneCard(cardModel: ICard): IComponent {
    const card = new Card(this.global, this, { ...cardModel });
    this.cards.push(card);
    return card;
  }

  addEventListeners(): void {
    this.element.addEventListener('click', GameBoard.handleBoardClick);
  }

  removeEventListeners(): void {
    this.element.removeEventListener('click', GameBoard.handleBoardClick);
  }

  private static handleBoardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const word = target.dataset.name as string;
    Events.boardClick.emit(word);
  }
}

export default GameBoard;
