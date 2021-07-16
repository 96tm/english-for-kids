import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import FileInput from './FileInput';
import TextInput from './TextInput';
import Events from '../../util/Events';
import WordCardButton from '../../models/WordCardButton';
import WordCardDTO from '../../models/WordCardDTO';

export default class WordCardContentCreate extends Component {
  buttonCreate: IComponent;
  buttonCancel: IComponent;
  inputWord: IComponent;
  inputTranslation: IComponent;
  inputAudio: IComponent;
  inputImage: IComponent;
  buttonsWrap: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private category: string
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminWordCardContentEdit,
    ]);
    this.inputWord = new TextInput(
      global,
      this,
      Constants.Labels.adminWordEditWordInputId,
      Constants.Labels.adminWordCardWord
    );
    this.inputTranslation = new TextInput(
      global,
      this,
      Constants.Labels.adminWordEditTranslationInputId,
      Constants.Labels.adminWordCardTranslation
    );
    this.inputAudio = new FileInput(
      global,
      this,
      Constants.Labels.adminWordEditAudioInputId,
      Constants.Labels.adminWordCardSound,
      'audio/mpeg'
    );
    this.inputImage = new FileInput(
      global,
      this,
      Constants.Labels.adminWordEditImageInputId,
      Constants.Labels.adminWordCardImage,
      'image/jpeg'
    );
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardButtonsWrap,
    ]);
    [this.buttonCreate, this.buttonCancel] = this.createButtons();
    this.addEventListeners();
  }

  private createButtons(): IComponent[] {
    const buttonCancel = new Component(
      this.global,
      this.buttonsWrap,
      'button',
      [Constants.CSSClasses.adminWordCardButtonCancel]
    );
    buttonCancel.textContent = Constants.Labels.adminWordCardButtonCancel;
    const buttonCreate = new Component(
      this.global,
      this.buttonsWrap,
      'button',
      [Constants.CSSClasses.adminWordCardButtonCreate]
    );
    buttonCreate.textContent = Constants.Labels.adminWordCardButtonCreate;
    return [buttonCreate, buttonCancel];
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    switch (target) {
      case this.buttonCancel.element:
        Events.wordCardClick.emit({
          button: WordCardButton.cancel,
          wordInfo: new WordCardDTO(),
        });
        break;
      case this.buttonCreate.element: {
        const audioFile = (this.inputAudio as FileInput).file;
        const imageFile = (this.inputImage as FileInput).file;
        Events.wordCardClick.emit({
          button: WordCardButton.create,
          wordInfo: new WordCardDTO(
            this.category,
            (this.inputWord as TextInput).value,
            (this.inputTranslation as TextInput).value,
            audioFile,
            imageFile
          ),
        });
        break;
      }
      default:
        break;
    }
  };
}
