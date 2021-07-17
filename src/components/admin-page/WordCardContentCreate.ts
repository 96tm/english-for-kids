import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import FileInput from './FileInput';
import TextInput from './TextInput';
import Events from '../../util/Events';
import WordCardButton from '../../models/WordCardButton';
import WordCardDTO from '../../models/WordCardDTO';
import BaseWordCardContent from './BaseWordCardContent';

export default class WordCardContentCreate extends BaseWordCardContent {
  buttonCreate: IComponent;
  buttonCancel: IComponent;
  inputWord: IComponent;
  inputTranslation: IComponent;
  inputAudio: IComponent;
  inputImage: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    private category: string
  ) {
    super(global, rootComponent, [
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
    this.buttonCreate.disable();
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
    this.element.addEventListener('input', this.handleInputChange);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('input', this.handleInputChange);
  }

  private handleInputChange: (event: Event) => void = (event) => {
    if (
      WordCardContentCreate.checkInputs(
        this.inputWord as TextInput,
        this.inputTranslation as TextInput,
        this.inputAudio as FileInput
      )
    ) {
      this.buttonCreate.enable();
    } else {
      this.buttonCreate.disable();
    }
  };

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
        const audioFile = (this.inputAudio as FileInput).value;
        const imageFile = (this.inputImage as FileInput).value;
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
