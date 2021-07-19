import ICard from './ICard';
import CardModel from './CardModel';

export default class BoardModel {
  cards: ICard[] = [];

  addOneCard({ category, word, translation, image, audioSrc }: ICard): void {
    const card = new CardModel(category, word, translation, image, audioSrc);
    this.cards.push(card);
  }

  async loadCards(
    category: string,
    responsePromise: Promise<Response>
  ): Promise<ICard[]> {
    const words: ICard[] = await responsePromise.then((response) =>
      response.json()
    );
    this.cards = [];
    const cards = words.map((card) => {
      const updatedCard = card;
      updatedCard.category = category;
      return updatedCard;
    });
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
