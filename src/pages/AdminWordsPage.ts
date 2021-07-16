import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import ICard from '../models/ICard';
import WordCard from '../components/admin-page/WordCard';
import Events from '../util/Events';
import WordCardButton from '../models/WordCardButton';
import Api from '../util/Api';
import IWordCardDTO from '../models/IWordCardDTO';

export default class AdminWordsPage extends Component {
  heading: IComponent;
  wordsWrap: IComponent;
  createWordCard: IComponent;
  words: IComponent[] = [];

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

  async init(category: string): Promise<void> {
    this.wordsWrap.element.innerHTML = '';
    const words = await Api.getAllWordsByCategory(category);
    console.log('got words', words);

    (words as ICard[]).forEach((word) => {
      const updatedWord = word;
      updatedWord.category = category;
      this.addOneWord(updatedWord);
      return updatedWord;
    });
    this.heading.textContent = category;
    this.createWordCard.attachTo(this.wordsWrap);
    (this.createWordCard as WordCard).category = category;
  }

  private handleWordCardClick: (data: {
    button: WordCardButton;
    wordInfo: IWordCardDTO;
  }) => Promise<void> = async (data) => {
    const wordCard = this.words.find((word) => {
      const currentCategory = (word as WordCard).category;
      const currentWord = (word as WordCard).word;
      return (
        currentCategory === data?.wordInfo?.category &&
        currentWord === data.wordInfo.word
      );
    });

    switch (data.button) {
      case WordCardButton.add:
        (this.createWordCard as WordCard).setModeCreate();
        break;
      case WordCardButton.remove:
        this.words = this.words.filter((word) => word !== wordCard);
        wordCard?.remove();
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
        Events.wordCreate.emit(data.wordInfo);
        (this.createWordCard as WordCard).setModeAdd();
        break;
      }
      case WordCardButton.save:
        break;
      default:
        break;
    }
  };

  private addOneWord({
    category,
    word,
    translation,
    image,
    audioSrc,
  }: ICard): IComponent {
    const wordCard = new WordCard(
      this.global,
      this.wordsWrap,
      category,
      word,
      translation,
      audioSrc,
      `${image}`
    );
    this.words.push(wordCard);
    return wordCard;
  }
}
