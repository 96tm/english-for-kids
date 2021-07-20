import Component from '../Component';
import IComponent from '../IComponent';

import FileInput from './FileInput';
import TextInput from './TextInput';
import BaseWordCardContent from './BaseWordCardContent';

import WordCardButton from '../../models/WordCardButton';
import WordCardDTO from '../../models/WordCardDTO';

import Events from '../../util/Events';
import Constants from '../../util/constants';
import {
  validateNonEmpty,
  validateEnglishWord,
  validateFileSize,
} from '../../util/Validators';

export default class WordCardContentCreate extends BaseWordCardContent {
  buttonCreate: IComponent;
  buttonCancel: IComponent;
  submit: IComponent;
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
    [this.inputWord, this.inputTranslation, this.inputAudio, this.inputImage] =
      this.createInputs();
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardButtonsWrap,
    ]);
    [this.buttonCreate, this.buttonCancel] = this.createButtons();
    this.submit = this.buttonCreate;
    this.addEventListeners();
    this.buttonCreate.disable();
  }

  private createInputs(): IComponent[] {
    const inputWord = new TextInput(
      this.global,
      this,
      Constants.Labels.adminWordEditWordInputId,
      Constants.Labels.adminWordCardWord,
      [validateNonEmpty, validateEnglishWord(Constants.Labels.word)]
    );
    const inputTranslation = new TextInput(
      this.global,
      this,
      Constants.Labels.adminWordEditTranslationInputId,
      Constants.Labels.adminWordCardTranslation,
      [validateNonEmpty]
    );
    const inputAudio = new FileInput(
      this.global,
      this,
      Constants.Labels.adminWordEditAudioInputId,
      Constants.Labels.adminWordCardSound,
      'audio/mpeg',
      [validateNonEmpty, validateFileSize(Constants.MAX_FILE_SIZE)]
    );
    const inputImage = new FileInput(
      this.global,
      this,
      Constants.Labels.adminWordEditImageInputId,
      Constants.Labels.adminWordCardImage,
      'image/jpeg',
      [validateFileSize(Constants.MAX_FILE_SIZE)]
    );
    return [inputWord, inputTranslation, inputAudio, inputImage];
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
