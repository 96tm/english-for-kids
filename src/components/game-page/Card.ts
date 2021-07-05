import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import ICard from '../../models/ICard';

class Card extends Component {
  inner: IComponent;

  front: IComponent;

  back: IComponent;

  overlay: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    { word, image }: ICard
  ) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.card], {
      'data-word': word,
    });
    this.inner = new Component(global, this, 'div', [
      Constants.CSSClasses.cardInner,
    ]);
    // this.inner.element.style.backgroundImage = image;
    this.front = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardFront,
    ]);
    this.back = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardBack,
    ]);
    this.overlay = new Component(global, this, 'div', [
      Constants.CSSClasses.cardOverlay,
    ]);
    this.setFront(image);
  }

  setFront(image: string): void {
    this.front.element.style.backgroundImage = `url(${image})`;
    this.back.element.style.backgroundImage = `url(${image})`;
  }
}

export default Card;
