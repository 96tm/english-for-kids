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
  frontTextPanel: IComponent;
  backTextPanel: IComponent;
  category: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;

  constructor(
    global: Window,
    rootComponent: IComponent,
    { category, word, translation, image, audioSrc }: ICard
  ) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.card], {
      'data-word': word,
    });
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.inner = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.cardInner,
    ]);
    [this.front, this.frontImage, this.frontTextPanel, this.frontText] =
      this.initFront();
    [this.back, this.backImage, this.backTextPanel, this.backText] =
      this.initBack();
    this.overlay = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.cardOverlay,
    ]);
    this.buttonTurn = new Component(global, this.backTextPanel, 'button', [
      Constants.CSS_CLASSES.cardButtonTurn,
    ]);
    this.addEventListeners();
  }

  private initFront(): [IComponent, IComponent, IComponent, IComponent] {
    const front = new Component(this.global, this.inner, 'div', [
      Constants.CSS_CLASSES.cardFront,
    ]);
    const frontImage = new Component(
      this.global,
      front,
      'img',
      [Constants.CSS_CLASSES.cardFrontImage],
      { src: this.image, alt: Constants.LABELS.wordIllustration }
    );
    const frontTextPanel = new Component(this.global, front, 'div', [
      Constants.CSS_CLASSES.cardFrontTextPanel,
    ]);
    const frontText = new Component(this.global, frontTextPanel, 'div', [
      Constants.CSS_CLASSES.cardFrontText,
    ]);
    frontText.textContent = this.translation;
    return [front, frontImage, frontTextPanel, frontText];
  }

  private initBack(): [IComponent, IComponent, IComponent, IComponent] {
    const back = new Component(this.global, this.inner, 'div', [
      Constants.CSS_CLASSES.cardBack,
    ]);
    const backImage = new Component(
      this.global,
      back,
      'img',
      [Constants.CSS_CLASSES.cardBackImage],
      { src: this.image, alt: Constants.LABELS.wordIllustration }
    );
    const backTextPanel = new Component(this.global, back, 'div', [
      Constants.CSS_CLASSES.cardBackTextPanel,
    ]);
    const backText = new Component(this.global, backTextPanel, 'div', [
      Constants.CSS_CLASSES.cardBackText,
    ]);
    backText.textContent = this.word;
    return [back, backImage, backTextPanel, backText];
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
    this.element.classList.remove(Constants.CSS_CLASSES.animated);
  };

  private handleCardClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target !== this.buttonTurn.element) {
      Events.boardDisabled.emit();
      Events.cardClick.emit(this.word);
    } else {
      this.element.classList.add(Constants.CSS_CLASSES.animated);
      Events.statsTrainingClick.emit({
        ...this,
      });
    }
  };

  private addCardClickListener(): void {
    this.element.addEventListener('click', this.handleCardClick);
  }

  private removeCardClickListener(): void {
    this.element.removeEventListener('click', this.handleCardClick);
  }

  markAsRight(): void {
    this.element.classList.add(Constants.CSS_CLASSES.cardRight);
  }

  setPlayMode(): void {
    this.element.classList.remove(Constants.CSS_CLASSES.cardRight);
    this.element.classList.add(Constants.CSS_CLASSES.cardFull);
    this.removeEventListeners();
    this.addCardClickListener();
  }

  setTrainMode(): void {
    this.element.classList.remove(Constants.CSS_CLASSES.cardRight);
    this.element.classList.remove(Constants.CSS_CLASSES.cardFull);
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
