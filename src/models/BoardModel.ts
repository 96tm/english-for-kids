import ICard from './ICard';
import CardModel from './CardModel';

import Constants from '../util/constants';

export default class BoardModel {
  cards: ICard[] = [];

  addOneCard({ category, word, translation, image, audioSrc }: ICard): void {
    const card = new CardModel(
      category,
      word,
      translation,
      `${Constants.HOMEPAGE}/public/${image}`,
      audioSrc
    );
    this.cards.push(card);
  }

  async loadCards(category: string): Promise<ICard[]> {
    const categories = await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    this.cards = [];
    if (categories && categories[category]) {
      const cards = (categories[category] as ICard[]).map((card) => {
        const updatedCard = card;
        updatedCard.category = category;
        return updatedCard;
      });
      cards.forEach((card) => {
        this.addOneCard(card);
      });
    }
    return this.cards;
  }

  getCard(word: string): ICard {
    return this.cards.find((card) => card.word === word) as ICard;
  }

  shuffleCards(): void {
    this.cards.sort(() => (Math.random() >= 0.5 ? 1 : -1));
  }
}
