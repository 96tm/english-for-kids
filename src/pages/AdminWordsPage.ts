import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import ICard from '../models/ICard';
import WordCardInfo from '../components/admin-page/WordCardInfo';
import CreateWordCard from '../components/admin-page/CreateWordCard';

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
    this.createWordCard = new CreateWordCard(global, this.wordsWrap);
  }

  async init(category: string): Promise<void> {
    console.log('page init');
    this.wordsWrap.element.innerHTML = '';

    const categories = await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());

    if (categories && categories[category]) {
      console.log('filling');

      (categories[category] as ICard[]).forEach((card) => {
        const updatedCard = card;
        updatedCard.category = category;
        this.addOneWord(updatedCard);
        return updatedCard;
      });
    }
    this.heading.textContent = category;
    this.createWordCard.remove();
    this.createWordCard = new CreateWordCard(this.global, this.wordsWrap);
  }

  private addOneWord({
    category,
    word,
    translation,
    image,
    audioSrc,
  }: ICard): IComponent {
    const wordCard = new WordCardInfo(
      this.global,
      this.wordsWrap,
      category,
      word,
      translation,
      audioSrc,
      `${Constants.HOMEPAGE}/public/${image}`
    );
    console.log('card', wordCard);

    this.words.push(wordCard);
    return wordCard;
  }
}
