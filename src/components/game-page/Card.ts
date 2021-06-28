import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

class Card extends Component {
  inner: IComponent;

  front: IComponent;

  back: IComponent;

  overlay: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.gamePageMain]);
    this.inner = new Component(global, this, 'div', [
      Constants.CSSClasses.cardInner,
    ]);
    this.front = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardFront,
    ]);
    this.back = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardBack,
    ]);
    this.overlay = new Component(global, this, 'div', [
      Constants.CSSClasses.cardOverlay,
    ]);
  }
}

export default Card;
