import Constants from './constants';
import ICategoryDTO from '../models/ICategoryDTO';
import ICard from '../models/ICard';
import IWordCardDTO from '../models/IWordCardDTO';

export default class Api {
  static async getAllCategories(): Promise<ICategoryDTO[]> {
    const categories: ICategoryDTO[] = await fetch(
      `${Constants.SERVER_URL}/categories`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((response) => response.json());
    // await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((response) => response.json());
    // Object.keys(categories).forEach((key) => {
    //   this.addOneCategory(key, categories[key].length);
    // });

    return categories;
  }

  static async createCategory(name: string): Promise<void> {
    await fetch(`${Constants.SERVER_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
  }

  static async removeCategory(name: string): Promise<void> {
    await fetch(`${Constants.SERVER_URL}/categories/${name}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async updateCategory(name: string, newName: string): Promise<void> {
    await fetch(`${Constants.SERVER_URL}/categories/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newName }),
    });
  }

  static async getAllWordsByCategory(category: string): Promise<ICard[]> {
    // categories = await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((response) => response.json());
    const words = fetch(
      `${Constants.SERVER_URL}/categories/${category}/words`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((response) => response.json());
    return words;
  }

  static async createWord({
    category,
    word,
    translation,
    audio,
    image,
  }: IWordCardDTO): Promise<Response> {
    const formData = new FormData();
    formData.append('image', image as File);
    formData.append('audio', audio as File);
    formData.append('word', word);
    formData.append('translation', translation);
    formData.append('category', category);

    return fetch(`http://localhost:4000/categories/${category}/words`, {
      method: 'POST',
      body: formData,
    });
  }

  static async removeWord(category: string, word: string): Promise<Response> {
    return fetch(`http://localhost:4000/categories/${category}/words/${word}`, {
      method: 'DELETE',
    });
  }
}
