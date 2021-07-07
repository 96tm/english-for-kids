import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import ICard from '../../models/ICard';
import Events from '../../util/Events';

export default class Card extends Component {
  inner: IComponent;

  front: IComponent;

  back: IComponent;

  overlay: IComponent;

  backText: IComponent;

  frontText: IComponent;

  frontImage: IComponent;

  backImage: IComponent;

  buttonTurn: IComponent;

  word: string;

  translation: string;

  frontTextPanel: IComponent;

  backTextPanel: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    { word, translation, image }: ICard
  ) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.card], {
      'data-word': word,
    });
    this.word = word;
    this.translation = translation;
    this.inner = new Component(global, this, 'div', [
      Constants.CSSClasses.cardInner,
    ]);
    this.front = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardFront,
    ]);
    this.frontImage = new Component(
      global,
      this.front,
      'img',
      [Constants.CSSClasses.cardFrontImage],
      { src: image, alt: Constants.Labels.wordIllustration }
    );
    this.frontTextPanel = new Component(global, this.front, 'div', [
      Constants.CSSClasses.cardFrontTextPanel,
    ]);
    this.frontText = new Component(global, this.frontTextPanel, 'div', [
      Constants.CSSClasses.cardFrontText,
    ]);
    this.back = new Component(global, this.inner, 'div', [
      Constants.CSSClasses.cardBack,
    ]);
    this.backImage = new Component(
      global,
      this.back,
      'img',
      [Constants.CSSClasses.cardBackImage],
      { src: image, alt: Constants.Labels.wordIllustration }
    );
    this.backTextPanel = new Component(global, this.back, 'div', [
      Constants.CSSClasses.cardBackTextPanel,
    ]);
    this.backText = new Component(global, this.backTextPanel, 'div', [
      Constants.CSSClasses.cardBackText,
    ]);
    this.overlay = new Component(global, this, 'div', [
      Constants.CSSClasses.cardOverlay,
    ]);
    this.backText.textContent = word;
    this.frontText.textContent = translation;
    this.buttonTurn = new Component(global, this.backTextPanel, 'button', [
      Constants.CSSClasses.cardButtonTurn,
    ]);
    this.addEventListeners();
  }

  addEventListeners(): void {
    this.addCardClickListener();
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
    this.element.addEventListener('click', this.handleCardClick);
  }

  removeEventListeners(): void {
    this.removeCardClickListener();
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    this.element.removeEventListener('click', this.handleCardClick);
  }

  private handleMouseLeave: () => void = () => {
    this.element.classList.remove(Constants.CSSClasses.animated);
  };

  private handleCardClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target !== this.buttonTurn.element) {
      Events.boardDisabled.emit();
      Events.cardClick.emit(this.word);
    } else {
      this.element.classList.add(Constants.CSSClasses.animated);
    }
  };

  private addCardClickListener(): void {
    this.element.addEventListener('click', this.handleCardClick);
  }

  private removeCardClickListener(): void {
    this.element.removeEventListener('click', this.handleCardClick);
  }

  markAsRight(): void {
    this.element.classList.add(Constants.CSSClasses.cardRight);
  }

  setPlayMode(): void {
    this.element.classList.remove(Constants.CSSClasses.cardRight);
    this.element.classList.add(Constants.CSSClasses.cardFull);
    this.removeEventListeners();
    this.addCardClickListener();
  }

  setTrainMode(): void {
    this.element.classList.remove(Constants.CSSClasses.cardRight);
    this.element.classList.remove(Constants.CSSClasses.cardFull);
    this.removeCardClickListener();
    this.addEventListeners();
  }

  enable(): void {
    this.addCardClickListener();
  }

  disable(): void {
    this.removeCardClickListener();
  }
}
