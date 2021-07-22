import Constants from './constants';

import IWordCardDTO from '../models/IWordCardDTO';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';
import StatusCodes from './StatusCodes';
import Events from './Events';

export default class Api {
  static async fetchWithTimeout(
    resource: RequestInfo,
    options: RequestInit,
    timeout = Constants.FETCH_TIMEOUT
  ): Promise<Response> {
    const abortController = new AbortController();
    const timeoutHandle = setTimeout(() => abortController.abort(), timeout);
    const token = localStorage.getItem('token') || '';
    const optionsAuth = options;
    optionsAuth.headers = {
      ...options?.headers,
      authorization: `Bearer ${token}`,
    };
    const response = await fetch(resource, {
      ...optionsAuth,
      signal: abortController.signal,
    });
    if (response.status === StatusCodes.UNAUTHORIZED) {
      Events.unauthorizedAccess.emit();
    }
    clearTimeout(timeoutHandle);
    return response;
  }

  static async login(login: string, password: string): Promise<Response> {
    return Api.fetchWithTimeout(`${Constants.SERVER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
  }

  static async logout(): Promise<Response> {
    return Api.fetchWithTimeout(`${Constants.SERVER_URL}/logout`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async getCategories(page = 1, limit = 0): Promise<Response> {
    return Api.fetchWithTimeout(
      `${Constants.SERVER_URL}/categories?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  static async createCategory(name: string): Promise<Response> {
    return Api.fetchWithTimeout(`${Constants.SERVER_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
  }

  static async removeCategory(name: string): Promise<Response> {
    return Api.fetchWithTimeout(`${Constants.SERVER_URL}/categories/${name}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async updateCategory(
    name: string,
    newName: string
  ): Promise<Response> {
    return Api.fetchWithTimeout(`${Constants.SERVER_URL}/categories/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newName }),
    });
  }

  static async getWordsByCategory(
    category: string,
    page = 1,
    limit = 0
  ): Promise<Response> {
    return Api.fetchWithTimeout(
      `${Constants.SERVER_URL}/categories/${category}/words?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  static async updateWord({
    category,
    word,
    newWord,
    translation,
    audio,
    image,
  }: IWordCardUpdateDTO): Promise<Response> {
    const formData = new FormData();
    formData.append('image', image as File);
    formData.append('audio', audio as File);
    formData.append('word', String(newWord));
    formData.append('translation', translation);
    formData.append('category', category);

    return Api.fetchWithTimeout(
      `${Constants.SERVER_URL}/categories/${category}/words/${word}`,
      {
        method: 'PUT',
        body: formData,
      }
    );
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

    return Api.fetchWithTimeout(
      `${Constants.SERVER_URL}/categories/${category}/words`,
      {
        method: 'POST',
        body: formData,
      }
    );
  }

  static async removeWord(category: string, word: string): Promise<Response> {
    return Api.fetchWithTimeout(
      `${Constants.SERVER_URL}/categories/${category}/words/${word}`,
      {
        method: 'DELETE',
      }
    );
  }
}
