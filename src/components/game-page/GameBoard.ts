import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import Card from './Card';
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
}

export default GameBoard;
