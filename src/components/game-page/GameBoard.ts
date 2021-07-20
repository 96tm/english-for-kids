import IComponent from '../IComponent';
import Component from '../Component';
import Card from './Card';

import ICard from '../../models/ICard';

import Constants from '../../util/constants';

class GameBoard extends Component {
  cards: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gameBoard]);
  }

  getCard(word: string): Card {
    return this.cards.find((card) => (card as Card).word === word) as Card;
  }

  addCards(cards: ICard[]): void {
    this.cards = [];
    this.element.innerHTML = '';
    cards.forEach((card) => {
      this.addOneCard(card);
    });
  }

  addOneCard(cardModel: ICard): IComponent {
    const card = new Card(this.global, this, { ...cardModel });
    this.cards.push(card);
    return card;
  }
}

export default GameBoard;
