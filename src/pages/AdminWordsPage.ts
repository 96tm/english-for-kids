import IComponent from '../components/IComponent';
import ICard from '../models/ICard';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';

import Component from '../components/Component';
import WordCard from '../components/admin-page/WordCard';
import WordCardButton from '../models/WordCardButton';

import Constants from '../util/constants';
import Events from '../util/Events';

import defaultWordImage from '../assets/icons/icons8-no-image.png';

export default class AdminWordsPage extends Component {
  heading: IComponent;
  wordsWrap: IComponent;
  createWordCard: IComponent;
  words: Record<string, IComponent> = {};

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminWords]);
    this.heading = new Component(
      global,
      this,
      'div',
      [Constants.CSSClasses.adminWordsHeading],
      { 'data-title': Constants.Labels.adminWordsHeading }
    );
    this.wordsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordsWrap,
    ]);
    this.createWordCard = new WordCard(global, this.wordsWrap);
    (this.createWordCard as WordCard).setModeAdd();
    Events.wordCardClick.add(this.handleWordCardClick);
  }

  async init(category: string, words: ICard[]): Promise<void> {
    this.wordsWrap.element.innerHTML = '';
    (this.createWordCard as WordCard).category = category;
    this.words = {};
    (words as ICard[]).forEach((word) => {
      const updatedWord = word;
      updatedWord.category = category;
      this.addOneWord(updatedWord);
    });
    this.heading.textContent = category;
    (this.createWordCard as WordCard).setModeAdd();
  }

  updateWords(word: string, newWord: string): void {
    this.words[newWord] = this.words[word];
    delete this.words[word];
  }

  getCard(word: string): IComponent | undefined {
    return this.words[word];
  }

  removeCard(word: string): void {
    const card = this.getCard(word);
    if (card) {
      delete this.words[word];
      card.remove();
    }
  }

  appendWords(words: ICard[]): void {
    words.forEach((word) => {
      this.addOneWord({ ...word });
    });
  }

  private handleWordCardClick: (data: {
    button: WordCardButton;
    wordInfo: IWordCardUpdateDTO;
  }) => Promise<void> = async (data) => {
    const wordCard = this.getCard(data.wordInfo.word);
    switch (data.button) {
      case WordCardButton.add:
        (this.createWordCard as WordCard).setModeCreate();
        break;
      case WordCardButton.remove:
        Events.wordRemove.emit(data.wordInfo);
        break;
      case WordCardButton.change:
        (wordCard as WordCard).setModeEdit({ ...data.wordInfo });
        break;
      case WordCardButton.cancel:
        if (wordCard) {
          (wordCard as WordCard).setModeNormal({ ...(wordCard as WordCard) });
        } else {
          (this.createWordCard as WordCard).setModeAdd();
        }
        break;
      case WordCardButton.create: {
        (this.createWordCard as WordCard).setModeAdd();
        Events.wordCreate.emit(data.wordInfo);
        break;
      }
      case WordCardButton.save:
        Events.wordUpdate.emit(data.wordInfo);
        break;
      default:
        break;
    }
  };

  addOneWord({ category, word, translation, image, audioSrc }: ICard): void {
    if (this.words[word]) return;
    const wordCard = new WordCard(
      this.global,
      this.wordsWrap,
      category,
      word,
      translation,
      audioSrc,
      `${image}` || defaultWordImage
    );
    this.words[word] = wordCard;
    this.createWordCard.attachTo(this.wordsWrap);
  }
}
