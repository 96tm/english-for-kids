import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class WordCardInfo extends Component {
  buttonRemove: IComponent;
  buttonChange: IComponent;
  imageTitleWrap: IComponent;
  imageWrap: IComponent;
  wordImage: IComponent;
  wordComponent: IComponent;
  translationComponent: IComponent;
  audioComponent: IComponent;
  infoWrap: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private category: string,
    private word: string,
    private translation: string,
    private audioSrc: string,
    private image: string
  ) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminWordCard]);
    this.infoWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardInfoWrap,
    ]);
    this.wordComponent = new Component(
      global,
      this.infoWrap,
      'div',
      [Constants.CSSClasses.adminWordCardWord],
      { 'data-title': Constants.Labels.adminWordCardInfoWord }
    );
    this.wordComponent.textContent = word;
    this.translationComponent = new Component(
      global,
      this.infoWrap,
      'div',
      [Constants.CSSClasses.adminWordCardTranslation],
      { 'data-title': Constants.Labels.adminWordCardInfoTranslation }
    );
    this.translationComponent.textContent = translation;
    this.audioComponent = new Component(
      global,
      this.infoWrap,
      'div',
      [Constants.CSSClasses.adminWordCardAudio],
      { 'data-title': Constants.Labels.adminWordCardInfoAudio }
    );
    this.audioComponent.textContent = audioSrc;
    [this.imageTitleWrap, this.imageWrap, this.wordImage] = this.createImage();
    [this.buttonRemove, this.buttonChange] = this.createButtons();
    this.addEventListeners();
  }

  private createButtons(): IComponent[] {
    const buttonRemove = new Component(this.global, this.infoWrap, 'button', [
      Constants.CSSClasses.adminWordCardButtonRemove,
    ]);
    const buttonChange = new Component(this.global, this.infoWrap, 'button', [
      Constants.CSSClasses.adminWordCardButtonChange,
    ]);
    buttonChange.textContent = Constants.Labels.adminWordCardButtonChange;

    return [buttonRemove, buttonChange];
  }

  private createImage(): IComponent[] {
    const imageTitleWrap = new Component(
      this.global,
      this.infoWrap,
      'div',
      [Constants.CSSClasses.adminWordCardImageTitleWrap],
      { 'data-title': Constants.Labels.adminWordCardInfoImage }
    );
    const imageWrap = new Component(this.global, imageTitleWrap, 'div', [
      Constants.CSSClasses.adminWordCardImageWrap,
    ]);
    const image = new Component(
      this.global,
      imageWrap,
      'img',
      [Constants.CSSClasses.adminWordCardImage],
      {
        src: this.image,
        alt: Constants.Labels.adminWordCardImageAlt,
      }
    );
    return [imageTitleWrap, imageWrap, image];
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
