import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import FileInput from './FileInput';
import TextInput from './TextInput';
import IWordCardDTO from '../../models/IWordCardDTO';
import Events from '../../util/Events';
import WordCardButton from '../../models/WordCardButton';
import WordCardDTO from '../../models/WordCardDTO';
import WordCardUpdateDTO from '../../models/WordCardUpdateDTO';
import BaseWordCardContent from './BaseWordCardContent';

export default class WordCardContentEdit extends BaseWordCardContent {
  buttonSave: IComponent;
  buttonCancel: IComponent;
  inputWord: IComponent;
  inputTranslation: IComponent;
  inputAudio: IComponent;
  inputImage: IComponent;
  category: string;
  word: string;

  constructor(
    global: Window,
    rootComponent: IComponent,
    { category, word, translation }: IWordCardDTO
  ) {
    super(global, rootComponent, [
      Constants.CSSClasses.adminWordCardContentEdit,
    ]);
    this.category = category;
    this.word = word;
    this.inputWord = new TextInput(
      global,
      this,
      Constants.Labels.adminWordEditWordInputId,
      Constants.Labels.adminWordCardWord,
      word
    );
    this.inputTranslation = new TextInput(
      global,
      this,
      Constants.Labels.adminWordEditTranslationInputId,
      Constants.Labels.adminWordCardTranslation,
      translation
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
    [this.buttonSave, this.buttonCancel] = this.createButtons();
    this.addEventListeners();
    this.buttonSave.disable();
    this.inputWord.element.focus();
  }

  private createButtons(): IComponent[] {
    const buttonCancel = new Component(
      this.global,
      this.buttonsWrap,
      'button',
      [Constants.CSSClasses.adminWordCardButtonCancel]
    );
    buttonCancel.textContent = Constants.Labels.adminWordCardButtonCancel;
    const buttonSave = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminWordCardButtonSave,
    ]);
    buttonSave.textContent = Constants.Labels.adminWordCardButtonSave;
    return [buttonSave, buttonCancel];
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
      WordCardContentEdit.checkInputs(
        this.inputWord as TextInput,
        this.inputTranslation as TextInput,
        this.inputAudio as FileInput
      )
    ) {
      this.buttonSave.enable();
    } else {
      this.buttonSave.disable();
    }
  };

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;

    switch (target) {
      case this.buttonCancel.element:
        Events.wordCardClick.emit({
          button: WordCardButton.cancel,
          wordInfo: new WordCardDTO(this.category, this.word),
        });
        break;
      case this.buttonSave.element:
        {
          const audioFile = (this.inputAudio as FileInput).value;
          const imageFile = (this.inputImage as FileInput).value;
          Events.wordCardClick.emit({
            button: WordCardButton.save,
            wordInfo: new WordCardUpdateDTO(
              this.category,
              this.word,
              (this.inputTranslation as TextInput).value,
              (this.inputWord as TextInput).value,
              audioFile,
              imageFile
            ),
          });
        }
        break;
      default:
        break;
    }
  };
}
