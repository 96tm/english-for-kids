import Constants from './constants';

export default class Api {
  static async getCategories(): Promise<Response> {
    return fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
