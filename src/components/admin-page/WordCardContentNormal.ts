import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Events from '../../util/Events';
import WordCardButton from '../../models/WordCardButton';
import WordCardDTO from '../../models/WordCardDTO';

export default class WordCardContentNormal extends Component {
  buttonRemove: IComponent;
  buttonChange: IComponent;
  imageTitleWrap: IComponent;
  imageWrap: IComponent;
  wordImage: IComponent;
  wordComponent: IComponent;
  translationComponent: IComponent;
  audioComponent: IComponent;
  audio: HTMLAudioElement;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private category: string,
    private word: string,
    private translation: string,
    private audioSrc: string,
    private image: string
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminWordCardContentNormal,
    ]);
    this.wordComponent = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.adminWordCardWord],
      { 'data-title': Constants.Labels.adminWordCardWord }
    );
    this.wordComponent.textContent = word;
    this.translationComponent = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.adminWordCardTranslation],
      { 'data-title': Constants.Labels.adminWordCardTranslation }
    );
    this.translationComponent.textContent = translation;
    this.audioComponent = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.adminWordCardAudio],
      { 'data-title': Constants.Labels.adminWordCardAudio, title: audioSrc }
    );
    this.audioComponent.textContent = audioSrc;
    [this.imageTitleWrap, this.imageWrap, this.wordImage] = this.createImage();
    [this.buttonRemove, this.buttonChange] = this.createButtons();
    this.audio = new Audio(this.audioSrc);
    this.addEventListeners();
  }

  private async playAudio(): Promise<void> {
    this.audio.currentTime = 0;
    return new Promise((resolve) => {
      this.audio.addEventListener(
        'ended',
        () => {
          resolve();
        },
        { once: true }
      );
      this.audio.play();
    });
  }

  private createButtons(): IComponent[] {
    const buttonRemove = new Component(this.global, this, 'button', [
      Constants.CSSClasses.adminWordCardButtonRemove,
    ]);
    const buttonChange = new Component(this.global, this, 'button', [
      Constants.CSSClasses.adminWordCardButtonChange,
    ]);
    buttonChange.textContent = Constants.Labels.adminWordCardButtonChange;

    return [buttonRemove, buttonChange];
  }

  private createImage(): IComponent[] {
    const imageTitleWrap = new Component(
      this.global,
      this,
      'div',
      [Constants.CSSClasses.adminWordCardImageTitleWrap],
      { 'data-title': Constants.Labels.adminWordCardImage }
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

  private handleClick: (event: MouseEvent) => void = async (event) => {
    const target = event.target as HTMLElement;
    switch (target) {
      case this.audioComponent.element:
        await this.playAudio();
        break;
      case this.buttonChange.element:
        Events.wordCardClick.emit({
          button: WordCardButton.change,
          wordInfo: new WordCardDTO(this.category, this.word, this.translation),
        });
        break;
      case this.buttonRemove.element:
        Events.wordCardClick.emit({
          button: WordCardButton.remove,
          wordInfo: new WordCardDTO(this.category, this.word, this.translation),
        });
        break;
      default:
        break;
    }
  };
}
