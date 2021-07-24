import Component from '../Component';
import IComponent from '../IComponent';
import Card from './Card';
import ICard from '../../models/ICard';
import Constants from '../../util/constants';

class GameBoard extends Component {
  cards: Card[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.gameBoard]);
  }

  getCard(word: string): Card {
    return this.cards.find((card) => card.word === word) as Card;
  }

  addCards(cardModels: ICard[]): void {
    this.cards = [];
    this.element.innerHTML = '';
    cardModels.forEach((cardModel) => {
      this.addOneCard(cardModel);
    });
  }

  addOneCard(cardModel: ICard): Card {
    const card = new Card(this.global, this, { ...cardModel });
    this.cards.push(card);
    return card;
  }
}

export default GameBoard;
