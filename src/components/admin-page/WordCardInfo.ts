import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class WordCardInfo extends Component {
  buttonRemove: IComponent;
  buttonChange: IComponent;
  imageWrap: IComponent;
  wordImage: IComponent;
  wordComponent: IComponent;
  translationComponent: IComponent;
  audioComponent: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private word: string,
    private translation: string,
    private audio: string,
    private image: string
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminWordCardInfo,
    ]);
    this.buttonRemove = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonRemove,
    ]);
    this.buttonChange = new Component(global, this, 'button', [
      Constants.CSSClasses.adminWordCardInfoButtonChange,
    ]);
    this.buttonChange.textContent = Constants.Labels.adminWordCardButtonChange;
    this.wordComponent = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardWord,
    ]);
    this.translationComponent = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardTranslation,
    ]);
    this.audioComponent = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardAudio,
    ]);

    this.imageWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardInfoImageWrap,
    ]);
    this.wordImage = new Component(
      global,
      this.imageWrap,
      'img',
      [Constants.CSSClasses.adminWordCardInfoImage],
      { src: this.image, alt: Constants.Labels.adminWordCardImageAlt }
    );
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
  };
}
