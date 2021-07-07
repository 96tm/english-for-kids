import ICard from './ICard';
import CardModel from './CardModel';

export default class BoardModel {
  cards: ICard[] = [];

  addOneCard({ word, translation, image, audioSrc }: ICard): void {
    const card = new CardModel(word, translation, image, audioSrc);
    this.cards.push(card);
  }

  async loadCards(category: string): Promise<ICard[]> {
    const categories = await fetch('../../cards.json').then((response) =>
      response.json()
    );
    this.cards = [];
    const cards: ICard[] = categories[category];
    cards.forEach((card) => {
      this.addOneCard(card);
    });
    return this.cards;
  }

  getCard(word: string): ICard {
    return this.cards.find((card) => card.word === word) as ICard;
  }

  shuffleCards(): void {
    this.cards.sort(() => (Math.random() >= 0.5 ? 1 : -1));
  }
}
