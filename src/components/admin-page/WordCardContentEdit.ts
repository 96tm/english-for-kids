import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import FileInput from './FileInput';
import TextInput from './TextInput';
import ICard from '../../models/ICard';
import IWordCardDTO from '../../models/IWordCardDTO';

export default class WordCardContentEdit extends Component {
  buttonSave: IComponent;
  buttonCancel: IComponent;
  inputWord: IComponent;
  inputTranslation: IComponent;
  inputAudio: IComponent;
  inputImage: IComponent;
  buttonsWrap: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    { category, word, translation }: IWordCardDTO
  ) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminWordCardContentEdit,
    ]);
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
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
  };
}
