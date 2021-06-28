import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';

class GameBoard extends Component {
  cards: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gameBoard]);
    this.init();
  }

  init(): void {
    for (let i = 0; i < Constants.NUMBER_OF_CARDS; i += 1) {
      this.append();
    }
  }

  append(
    tagName: string = 'div',
    classList: string[] = [Constants.CSSClasses.card],
    attributes: AttributeRecord = {}
  ): IComponent {
    const card = super.append(tagName, classList, attributes);
    this.cards.push(card);
    return card;
  }
}

export default GameBoard;
